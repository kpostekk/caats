import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
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
    })
  }

  async findCurrent(user: Pick<User, 'id'>) {
    const { groups } = await this.returnGroups({ user })

    return await this.prisma.timetableEvent.findFirst({
      where: {
        startsAt: {
          gte: new Date(),
        },
        endsAt: {
          lt: new Date(),
        },
        groups: {
          hasSome: groups,
        },
      },
    })
  }

  async findByUser(
    id: string,
    sinceUntil?: GqlSinceUntil,
    skipTake?: GqlSkipTake
  ) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    })

    return this.prisma.timetableEvent.findMany({
      where: {
        OR: [
          {
            groups: {
              hasSome: user.groups,
            },
          },
          {
            hosts: {
              has: user.id,
            },
          },
        ],
        startsAt: {
          gte: sinceUntil?.since,
        },
        endsAt: {
          lte: sinceUntil?.until,
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      ...skipTake,
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        source: {
          include: {
            task: {
              include: {
                worker: true,
              },
            },
          },
        },
      },
    })
  }

  async findByGroups(
    groups: string[],
    sinceUntil?: GqlSinceUntil,
    skipTake?: GqlSkipTake
  ) {
    return this.prisma.timetableEvent.findMany({
      where: {
        groups: {
          hasSome: groups,
        },
        startsAt: {
          gte: sinceUntil?.since,
        },
        endsAt: {
          lte: sinceUntil?.until,
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      ...skipTake,
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        source: {
          include: {
            task: {
              include: {
                worker: true,
              },
            },
          },
        },
      },
    })
  }

  async findNextUserEvent(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    })

    return this.prisma.timetableEvent.findFirst({
      where: {
        OR: [
          {
            groups: {
              hasSome: user.groups,
            },
          },
          {
            hosts: {
              has: user.id,
            },
          },
        ],
        startsAt: {
          gte: new Date(),
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        source: {
          include: {
            task: {
              include: {
                worker: true,
              },
            },
          },
        },
      },
    })
  }

  async findCurrentUserEvent(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    })

    return this.prisma.timetableEvent.findFirst({
      where: {
        OR: [
          {
            groups: {
              hasSome: user.groups,
            },
          },
          {
            hosts: {
              has: user.id,
            },
          },
        ],
        startsAt: {
          lte: new Date(),
        },
        endsAt: {
          gte: new Date(),
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        source: {
          include: {
            task: {
              include: {
                worker: true,
              },
            },
          },
        },
      },
    })
  }

  async findByHost(
    host: string,
    sinceUntil?: GqlSinceUntil,
    skipTake?: GqlSkipTake
  ) {
    return this.prisma.timetableEvent.findMany({
      where: {
        hosts: {
          has: host,
        },
        startsAt: {
          gte: sinceUntil?.since,
        },
        endsAt: {
          lte: sinceUntil?.until,
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
      ...skipTake,
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        source: {
          include: {
            task: {
              include: {
                worker: true,
              },
            },
          },
        },
      },
    })
  }

  async getGroupsList() {
    const groups = await this.prisma.$queryRaw<{ group: string }[]>`
      SELECT "group"
      FROM (SELECT DISTINCT unnest(groups) as "group" FROM "TimetableEvent") as UnnestedGroups
      ORDER BY "group"
    `

    return Array.from(groups.flatMap((g) => g.group))
  }

  async autocompleteGroups(query: string) {
    const groups = await this.prisma.$queryRaw<{ group: string }[]>`
      SELECT "group"
      FROM (SELECT DISTINCT unnest(groups) as "group" FROM "TimetableEvent") as UnnestedGroups
      WHERE string_to_array(lower("group"), ' ') @> string_to_array(lower(${query}), ' ') OR lower("group") LIKE lower(${query}) || '%'
      ORDER BY "group"
      LIMIT 10
    `

    return Array.from(groups.flatMap((g) => g.group))
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

  getEventHistory(constantId: string) {
    const event = this.prisma.timetableEvent.findMany({
      where: {
        source: {
          constantId,
        },
      },
      include: {
        source: {
          include: {
            task: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    })
    return event
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
