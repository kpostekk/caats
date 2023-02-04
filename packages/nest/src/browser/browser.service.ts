import { Injectable } from '@nestjs/common'
import { GqlSinceUntil, GqlSkipTake } from '../gql'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
