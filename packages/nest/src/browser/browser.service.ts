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
      WHERE string_to_array(lower("group"), ' ') @> string_to_array(lower(${query}), ' ')
      ORDER BY "group"
      LIMIT 10
    `

    return Array.from(groups.flatMap((g) => g.group))
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
}
