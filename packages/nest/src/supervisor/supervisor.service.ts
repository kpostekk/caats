import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ConnectionStatus, Task, TaskStatus } from '@prisma/client'
import { DateTime } from 'luxon'
import { ParserService } from './parser/parser.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { createHash, randomBytes } from 'crypto'
import { randAnimal } from '@ngneat/falso'
import { JwtService } from '@nestjs/jwt'
import { PubsubService } from '../pubsub/pubsub.service'
// import { EmitterService } from '../emitter/emitter.service'

@Injectable()
export class SupervisorService implements OnModuleInit {
  private readonly logger = new Logger(SupervisorService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly parser: ParserService,
    private readonly jwt: JwtService,
    private readonly pubsub: PubsubService,
  ) {}

  async onModuleInit() {
    await this.prisma.scraper.updateMany({
      data: { state: 'DISCONNECTED' },
    })

    const taskCount = await this.prisma.task.count({
      where: { status: 'SUCCESS' },
    })

    this.logger.verbose('Creating tasks if needed...')
    if (taskCount < 14) {
      await this.createTasks(21, 1)
    }

    this.logger.verbose('Initial cleanup is done.')
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  private async periodicCleanup() {
    this.logger.verbose('Invalidating corrupted tasks...')
    await this.invalidateCorruptedTasks()
  }

  getPendingTasks() {
    return this.prisma.task.findMany({
      where: {
        status: 'PENDING',
      },
    })
  }

  async updateTaskState(id: number, state: TaskStatus) {
    if (state === 'SKIPPED') {
      this.logger.debug(`Task #${id} skipped.`)
      const { initialHash } = await this.prisma.task.findFirstOrThrow({
        where: { id },
      })
      const lastSuccess = await this.prisma.task.findFirstOrThrow({
        where: { finalHash: initialHash, status: 'SUCCESS' },
        orderBy: { finishedAt: 'desc' },
      })

      await this.prisma.taskResult.updateMany({
        where: { taskId: lastSuccess.id },
        data: { createdAt: new Date() },
      })
    }

    await this.prisma.task.update({
      where: { id },
      data: {
        status: state,
        finishedAt: !['PENDING', 'RUNNING'].includes(state)
          ? new Date()
          : undefined,
      },
    })
  }

  /**
   * Processes result from scraper (a string with html payload), validates it and inserts into database.
   *
   * @returns on of the following: `replaced` (found data with the same constantId), `dropped` (invalid or unsupported payload) or `inserted``
   */
  private async processResult(
    result: string,
    task: Pick<Task, 'id' | 'targetDate'>
  ) {
    const candidate = this.parser.htmlToRawObject(result)

    // if constantId is already in use, reassign it to the new task
    const constantId = createHash('sha1')
      .update(JSON.stringify(candidate))
      .update(task.targetDate.getTime().toString())
      .digest('hex')
      .slice(0, 16)

    const existingResult = await this.prisma.taskResult.findFirst({
      where: { constantId },
    })

    if (existingResult) {
      await this.prisma.taskResult.update({
        where: { constantId },
        data: { taskId: task.id, createdAt: new Date() },
      })
      return 'replaced'
    }

    // otherwise, create a new task result and event
    const newTaskResult = await this.prisma.taskResult.create({
      data: {
        constantId,
        taskId: task.id,
        object: candidate,
      },
    })

    if (
      candidate.ctl06_TypZajecLabel?.value !== 'Wykład' &&
      candidate.ctl06_TypZajecLabel?.value !== 'Ćwiczenia' &&
      candidate.ctl06_TypRezerwacjiLabel?.value !== 'egzamin'
    ) {
      return 'dropped'
    }

    if (candidate.ctl06_TypRezerwacjiLabel?.value === 'egzamin') {
      const nonEmptyKeys = [
        'ctl06_GrupyStudenckieLabel',
        'ctl06_KodyPrzedmiotowLabel',
        'ctl06_NazwyPrzedmiotowLabel',
      ]

      for (const key of nonEmptyKeys) {
        if (candidate[key].value === '---' || !candidate[key].value) {
          return 'dropped'
        }
      }
    }

    const evBody =
      candidate.ctl06_TypRezerwacjiLabel?.value === 'egzamin'
        ? this.parser.convertRawObjectReservationToEvent(
            newTaskResult.id,
            candidate as Record<string, { value?: string; humanKey: string }>
          )
        : this.parser.convertRawObjectToEvent(
            newTaskResult.id,
            candidate as Record<string, { value?: string; humanKey: string }>
          )

    await this.prisma.timetableEvent.create({
      data: evBody,
    })

    return 'inserted'
  }

  /**
   * A main handle for storing incoming raw payloads from scrappers.
   * @param id id of the task done by scrapper
   * @param hash hash of the initial page, used later to find updates/changes
   * @param results array of scraped html payloads provided by scraper
   * @param scraperId id of the scraper
   */
  async storeTaskResult(
    id: number,
    hash: string,
    results: string[],
    scraperId?: string
  ) {
    const task = await this.prisma.task.findFirstOrThrow({
      where: { id },
    })

    const start = DateTime.now()

    const stats = {
      dropped: 0,
      replaced: 0,
      inserted: 0,
    }

    this.logger.debug(`Processing result of task #${task.id}...`)

    for (const result of results) {
      const resultDescription = await this.processResult(result, task)
      stats[resultDescription]++
    }

    const end = DateTime.now()

    this.logger.debug(
      `Task #${id} processed ${results.length} elements in ${end
        .diff(start)
        .toISO()}. Processing speed: ${(
        results.length / end.diff(start).as('seconds')
      ).toFixed(2)} results per second.
          dropped: ${stats.dropped},
          replaced: ${stats.replaced},
          inserted: ${stats.inserted}.`
    )

    await this.prisma.$transaction([
      // invalidate outdated tasks
      this.prisma.task.updateMany({
        where: { targetDate: task.targetDate, id: { not: id } },
        data: { status: 'OUTDATED' },
      }),
      // mark task as success
      this.prisma.task.update({
        where: { id },
        data: { status: 'SUCCESS', finishedAt: new Date(), finalHash: hash },
      }),
    ])

    if (!scraperId) return
    await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        workerId: scraperId,
      },
    })
  }

  /**
   * Removes redundant or dangling entries from the database.
   */
  private async invalidateCorruptedTasks() {
    await this.prisma.$transaction([
      this.prisma.task.updateMany({
        where: { status: 'PENDING' },
        data: { status: 'CANCELLED' },
      }),
      this.prisma.task.updateMany({
        where: { status: 'RUNNING' },
        data: { status: 'FAILED' },
      }),
      this.prisma.task.deleteMany({
        where: { NOT: { status: 'SUCCESS' } },
      }),
    ])
  }

  /**
   * Creates many task for scrapers.
   */
  async createTasks(forwardDays = 30, backwardDays = 7) {
    const initialDate = DateTime.local({ zone: 'UTC' })
      .startOf('day')
      .minus({ days: backwardDays })

    for (let i = 0; i < forwardDays + backwardDays; i++) {
      const iterDate = initialDate.plus({ days: i }).toJSDate()

      const lastTask = await this.prisma.task.findFirst({
        where: { status: 'SUCCESS', targetDate: iterDate },
        orderBy: { targetDate: 'desc' },
        select: { finalHash: true },
      })

      await this.prisma.task.create({
        data: {
          targetDate: iterDate,
          status: 'PENDING',
          initialHash: lastTask?.finalHash,
        },
      })
    }

    await this.dispatch()

    return true
  }

  /**
   * Dispatches tasks to scrapers based on their availability. If scraper or task wasn't found nothing will happen.
   */
  async dispatch() {
    const tasksLeft = await this.prisma.task.count({
      where: { status: 'PENDING' },
    })

    if (tasksLeft > 0) this.logger.verbose(`${tasksLeft} tasks left.`)

    const nextTask = await this.prisma.task.findFirst({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
    })

    if (!nextTask) return
    this.logger.debug(`Found task #${nextTask.id} to dispatch!`)

    const nextScraper = await this.prisma.scraper.findFirst({
      where: { state: 'AWAITING' },
      orderBy: { lastSeen: 'desc' },
    })

    if (!nextScraper) return
    this.logger.debug(`Found scraper ${nextScraper.alias} to dispatch!`)

    this.pubsub.publish(nextScraper.id, {
      receiveTask: {
        id: nextTask.id,
        date: nextTask.targetDate.toISOString().substring(0, 10),
        hash: nextTask.initialHash,
      },
    })

    // this.emitter.getEmitter().emit({
    //   topic: nextScraper.id,
    //   payload: {
    //     receiveTask: {
    //       id: nextTask.id,
    //       date: nextTask.targetDate.toISOString().substring(0, 10),
    //       hash: nextTask.initialHash,
    //     },
    //   },
    // })

    await this.prisma.task.update({
      where: { id: nextTask.id },
      data: { status: 'RUNNING' },
    })
    await this.prisma.scraper.update({
      where: { id: nextScraper.id },
      data: { state: 'BUSY', taskId: nextTask.id },
    })
  }

  @Cron('*/10 7-22 * * *')
  async periodicTaskCreation() {
    const pendingTasks = await this.prisma.task.count({
      where: { status: 'PENDING' },
    })

    if (pendingTasks >= 21) return

    const nextEnd = DateTime.fromObject({
      day: 2,
      month: 7,
      year: 2023,
    })
      .diffNow()
      .as('days')

    await this.createTasks(Math.max(Math.floor(nextEnd), 7 * 4 * 2), 0)
  }

  getTaskQueue() {
    return this.prisma.task.findMany({
      where: { OR: [{ status: 'PENDING' }, { status: 'RUNNING' }] },
      orderBy: { targetDate: 'asc' },
    })
  }

  async createScraper(ownerId: string, alias?: string) {
    if (!alias) alias = randAnimal()

    const newScraper = await this.prisma.scraper.create({
      data: {
        alias,
        ownerId,
      },
    })

    const accessToken = await this.jwt.signAsync({
      jti: randomBytes(24).toString('hex'),
      sub: newScraper.id,
      scraper: true,
      iat: new Date().getTime(),
    })

    return [newScraper, accessToken]
  }

  /**
   * Updates scraper status (availability). This shouldn't be called by users!
   */
  async updateScraper(id: string, connStatus: ConnectionStatus) {
    const scraper = await this.prisma.scraper.findUniqueOrThrow({
      where: { id },
    })

    switch (connStatus) {
      case 'AWAITING':
        await this.prisma.scraper.update({
          where: { id },
          data: {
            lastSeen: new Date(),
            state: 'AWAITING',
          },
        })
        this.logger.verbose(`Scraper ${scraper.alias} is awaiting for a task.`)
        break
      case 'DISCONNECTED':
        // if (scraper.state === 'BUSY' && scraper.taskId) {
        //   await this.prisma.task.update({
        //     where: { id: scraper.taskId },
        //     data: { status: 'FAILED' },
        //   })
        // }

        await this.prisma.scraper.update({
          where: { id },
          data: {
            lastSeen: new Date(),
            state: 'DISCONNECTED',
            taskId: null,
          },
        })
        this.logger.verbose(`Scraper ${scraper.alias} has been disconnected.`)
        break
      default:
        throw new Error('Invalid connection status!')
    }
  }

  getOngoingScrapers() {
    return this.prisma.scraper.findMany({
      where: {
        lastSeen: {
          gte: DateTime.now().minus({ hours: 12 }).toJSDate(),
        },
      },
      select: {
        id: true,
        alias: true,
        lastSeen: true,
        state: true,
        currentTask: {
          select: {
            id: true,
            targetDate: true,
            createdAt: true,
            status: true,
          },
        },
      },
      orderBy: {
        lastSeen: 'desc',
      },
    })
  }
}
