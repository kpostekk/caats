import { Injectable } from '@nestjs/common'
import { TimetableEvent, User } from '@prisma/client'
import {
  GqlScheduleInput,
  GqlScheduleTargets,
  GqlSinceUntil,
  GqlSkipTake,
} from '../gql'
import { PrismaService } from '../prisma/prisma.service'

type ScheduleFindOptions = GqlScheduleInput &
  GqlScheduleTargets & { user?: Pick<User, 'id'> }

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findByDescription(fullQuery: string) {
    const parsed = /^(?<q>[\p{L} ]+)(, ?(?<mod>[\p{L} ]+\p{N}*))*$/gmu
    const results = parsed.exec(fullQuery)

    if (!results) return []

    const groups: Partial<{ q: string; mod: string }> = results.groups

    if (!groups || !groups.q) return []

    const events = await this.prisma.$queryRaw<{ id: number }[]>`
      SELECT id
      FROM (SELECT id,
                   ARRAY [lower(code), lower(subject), lower(type), lower(room)] || string_to_array(lower(array_to_string((hosts), ' ')), ' ') || groups AS "combined",
                    "endsAt"
            FROM "TimetableEvent") AS QueryCompound
      WHERE combined @> string_to_array(lower(${groups.q}), ' ')
      AND "endsAt" > now()
      ORDER BY "endsAt"
      LIMIT 50
    `

    return await this.prisma.timetableEvent.findMany({
      where: {
        id: {
          in: events.map((e) => e.id),
        },
      },
      include: {
        source: {
          include: {
            task: true,
          },
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
