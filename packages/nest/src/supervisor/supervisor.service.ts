import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, TaskStatus } from '@prisma/client'
import { DateTime } from 'luxon'
import { ParserService } from './parser/parser.service'

@Injectable()
export class SupervisorService implements OnModuleInit {
  private readonly logger = new Logger(SupervisorService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly parser: ParserService
  ) {}

  async onModuleInit() {
    await this.createTasks()
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
        finishedAt: !['PENDING', 'RUNNING'].includes(state) && new Date(),
      },
    })
  }

  async storeTaskResult(id: number, hash: string, result: string[]) {
    const { targetDate } = await this.prisma.task.findFirstOrThrow({
      where: { id },
    })

    const start = DateTime.now()
    await this.prisma.$transaction([
      // invalidate outdated tasks
      this.prisma.task.updateMany({
        where: { targetDate },
        data: { status: 'OUTDATED' },
      }),
      // update task props
      this.prisma.task.update({
        where: { id },
        data: { finalHash: hash, finishedAt: new Date() },
      }),
      // store task results
      this.prisma.taskResult.createMany({
        data: result.map((r) => ({
          taskId: id,
          object: this.parser.htmlToObject(r),
        })),
      }),
      // mark task as success
      this.prisma.task.update({
        where: { id },
        data: { status: 'SUCCESS' },
      }),
    ])
    const end = DateTime.now()

    this.logger.debug(
      `Task ${id} parsed ${result.length} elements in ${end
        .diff(start)
        .toISO()}. Parse speed: ${(
        result.length / end.diff(start).as('seconds')
      ).toFixed(2)} results per second.`
    )

    // create events from results
    const eventsCandidates = await this.prisma.taskResult.findMany({
      where: {
        taskId: id,
        OR: [
          {
            object: {
              path: ['ctl06_TypZajecLabel', 'value'],
              equals: 'Wykład',
            },
          },
          {
            object: {
              path: ['ctl06_TypZajecLabel', 'value'],
              equals: 'Ćwiczenia',
            },
          },
        ],
      },
    })

    await this.prisma.timetableEvent.createMany({
      data: eventsCandidates.map((c) => {
        const {
          ctl06_DataZajecLabel: date,
          ctl06_GodzRozpLabel: timeStart,
          ctl06_GodzZakonLabel: timeEnd,
          ctl06_DydaktycyLabel: hostsString,
          ctl06_SalaLabel: room,
          ctl06_TypZajecLabel: type,
          ctl06_KodPrzedmiotuLabel: code,
          ctl06_NazwaPrzedmiotyLabel: name,
          ctl06_GrupyLabel: groupsString,
        } = c.object as Record<string, { value?: string; humanKey: string }>

        const startsAt = DateTime.fromFormat(
          `${date.value} ${timeStart.value}`,
          'dd.MM.yyyy HH:mm:ss'
        ).toJSDate()
        const endsAt = DateTime.fromFormat(
          `${date.value} ${timeEnd.value}`,
          'dd.MM.yyyy HH:mm:ss'
        ).toJSDate()

        return {
          code: code.value,
          name: name.value,
          room: room?.value,
          groups: groupsString?.value.split(', '),
          hosts: hostsString?.value.split(', '),
          type: type.value,
          startsAt,
          endsAt,
          sourceId: c.id,
        }
      }),
    })
  }

  async createTasks() {
    const [cancelled, failed] = await this.prisma.$transaction([
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

    const initialDate = DateTime.now().startOf('day')

    for (let i = 0; i < 120; i++) {
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
