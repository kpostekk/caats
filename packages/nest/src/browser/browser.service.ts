import { Injectable } from '@nestjs/common'
import { TimetableEvent, User } from '@prisma/client'
import { GqlScheduleInput, GqlScheduleTargets } from '../gql'
import { PrismaService } from '../prisma/prisma.service'
import { MeilisearchService } from '../meilisearch/meilisearch.service'

type ScheduleFindOptions = GqlScheduleInput &
  GqlScheduleTargets & { user?: Pick<User, 'id'> }

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService, private readonly meili: MeilisearchService) {}

  private async returnGroups(options: ScheduleFindOptions) {
    if (options.user) {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id: options.user.id,
        },
        select: {
          groups: true,
        },
      })
    }
    return { groups: options.groups }
  }

  async find(options: ScheduleFindOptions) {
    const { groups } = await this.returnGroups(options)

    const result = await this.prisma.timetableEvent.findMany({
      where: {
        startsAt: {
          gte: options?.since,
        },
        endsAt: {
          lte: options?.until,
        },
        groups: {
          hasSome: groups ?? [],
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      skip: options?.skip,
      take: options?.take,
      orderBy: {
        startsAt: 'asc',
      },
    })
    return result
  }

  async findNext(user: Pick<User, 'id'>) {
    const { groups } = await this.returnGroups({ user })

    return await this.prisma.timetableEvent.findFirst({
      where: {
        startsAt: {
          gte: new Date(),
        },
        groups: {
          hasSome: groups,
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
    })
  }

  async findCurrent(user: Pick<User, 'id'>) {
    const { groups } = await this.returnGroups({ user })
    const now = new Date()

    return await this.prisma.timetableEvent.findFirst({
      where: {
        startsAt: {
          lte: now,
        },
        endsAt: {
          gt: now,
        },
        groups: {
          hasSome: groups,
        },
      },
    })
  }

  async findNextToEvent(
    user: Pick<User, 'id'>,
    event: Pick<TimetableEvent, 'endsAt'>
  ) {
    const { groups } = await this.returnGroups({ user })

    return await this.prisma.timetableEvent.findFirst({
      where: {
        startsAt: {
          gt: event.endsAt,
        },
        groups: {
          hasSome: groups,
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
    })
  }

  async findPreviousToNext(
    user: Pick<User, 'id'>,
    event: Pick<TimetableEvent, 'startsAt'>
  ) {
    const { groups } = await this.returnGroups({ user })

    return await this.prisma.timetableEvent.findFirst({
      where: {
        startsAt: {
          lt: event.startsAt,
        },
        groups: {
          hasSome: groups,
        },
      },
      orderBy: {
        startsAt: 'desc',
      },
    })
  }

  async findByDescription(query: string) {
    const events = await this.meili.searchByQuery(query)

    return await this.prisma.timetableEvent.findMany({
      where: {
        id: {
          in: events.hits.map((e) => e.id),
        },
      },
    })
  }

  async getEvent(id: string | number) {
    const target = Number(id)

    if (Number.isNaN(target)) return null

    return await this.prisma.timetableEvent.findUnique({
      where: {
        id: target,
      },
    })
  }

  async getSource(id: number) {
    return await this.prisma.taskResult.findUnique({
      where: {
        id,
      },
    })
  }

  async getTask(id: number) {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
    })
  }

  async getScraper(id: string) {
    return await this.prisma.scraper.findUnique({
      where: {
        id,
      },
    })
  }
}
