import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { TaskStatus } from '@prisma/client'
import { DateTime } from 'luxon'
import { ParserService } from './parser/parser.service'
import { Cron } from '@nestjs/schedule'
import { createHash } from 'crypto'

@Injectable()
export class SupervisorService implements OnModuleInit {
  private readonly logger = new Logger(SupervisorService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly parser: ParserService
  ) {}

  async onModuleInit() {
    await this.invalidateCorruptedTasks()

    const taskCount = await this.prisma.task.count({
      where: { status: 'SUCCESS' },
    })

    if (taskCount < 14) {
      await this.createTasks(21, 1)
    }
  }

  getPendingTasks() {
    return this.prisma.task.findMany({
      where: {
        status: 'PENDING',
      },
    })
  }

  async updateTaskState(id: number, state: TaskStatus) {
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

  async storeTaskResult(id: number, hash: string, results: string[]) {
    const task = await this.prisma.task.findFirstOrThrow({
      where: { id },
    })

    const start = DateTime.now()

    const stats = {
      dropped: 0,
      replaced: 0,
      inserted: 0,
    }

    for (const result of results) {
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
          data: { taskId: id },
        })
        stats.replaced++
        continue
      }

      // otherwise, create a new task result and event
      const newTaskResult = await this.prisma.taskResult.create({
        data: {
          constantId,
          taskId: id,
          object: candidate,
        },
      })

      if (
        candidate.ctl06_TypZajecLabel?.value !== 'Wykład' &&
        candidate.ctl06_TypZajecLabel?.value !== 'Ćwiczenia'
      ) {
        stats.dropped++
        continue
      }

      const evBody = this.parser.convertRawObjectToEvent(
        newTaskResult.id,
        candidate as Record<string, { value?: string; humanKey: string }>
      )

      await this.prisma.timetableEvent.create({
        data: evBody,
      })
      stats.inserted++
    }

    const end = DateTime.now()

    this.logger.debug(
      `Task ${id} processed ${results.length} elements in ${end
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
  }

  async invalidateCorruptedTasks() {
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

    return true
  }

  @Cron('*/10 7-22 * * *')
  async periodicTaskCreation() {
    const pendingTasks = await this.prisma.task.count({
      where: { status: 'PENDING' },
    })

    if (pendingTasks >= 21) return

    await this.createTasks(7 * 12, 0)
  }

  getTaskQueue() {
    return this.prisma.task.findMany({
      where: { OR: [{ status: 'PENDING' }, { status: 'RUNNING' }] },
      orderBy: { targetDate: 'asc' },
    })
  }

  getHistoricalTasks() {
    return this.prisma.task.findMany({
      where: {
        OR: [
          { status: 'OUTDATED' },
          { status: 'SUCCESS' },
          { status: 'SKIPPED' },
        ],
      },
      orderBy: { targetDate: 'desc' },
    })
  }
}
