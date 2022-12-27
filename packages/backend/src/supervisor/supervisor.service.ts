import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { TaskStatus } from '@prisma/client'
import { DateTime } from 'luxon'

@Injectable()
export class SupervisorService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

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

  updateTaskState(id: number, state: TaskStatus) {
    return this.prisma.task.update({
      where: { id },
      data: { status: state },
    })
  }

  async storeTaskResult(id: number, hash: string, result: string[]) {
    const { targetDate } = await this.prisma.task.findFirstOrThrow({
      where: { id },
    })

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
        data: result.map((r) => ({ taskId: id, value: r })),
      }),
      // mark task as success
      this.prisma.task.update({
        where: { id },
        data: { status: 'SUCCESS' },
      }),
    ])
  }

  async createTasks() {
    const [cancelled, failed, deleted] = await this.prisma.$transaction([
      this.prisma.task.updateMany({
        where: { status: 'PENDING' },
        data: { status: 'CANCELLED' },
      }),
      this.prisma.task.updateMany({
        where: { status: 'RUNNING' },
        data: { status: 'FAILED' },
      }),
      this.prisma.task.deleteMany({
        where: { status: { not: 'SUCCESS' } },
      }),
    ])

    console.log({
      cancelled,
      failed,
      deleted,
    })

    const initialDate = DateTime.now().startOf('day')

    for (let i = 0; i < 30; i++) {
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
}
