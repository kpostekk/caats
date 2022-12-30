import { Injectable } from '@nestjs/common'
import { SinceUntil, SkipTake } from '../_autogen/gql'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(id: string, sinceUntil?: SinceUntil, skipTake?: SkipTake) {
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
          gte: sinceUntil?.since && new Date(sinceUntil.since),
        },
        endsAt: {
          lte: sinceUntil?.until && new Date(sinceUntil.until),
        },
      },
      ...skipTake,
    })
  }

  async findByGroups(
    groups: string[],
    sinceUntil?: SinceUntil,
    skipTake?: SkipTake
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
      },
      ...skipTake,
    })
  }

  async findByHost(host: string, skipTake?: SkipTake) {
    return this.prisma.timetableEvent.findMany({
      where: {
        hosts: {
          has: host,
        },
      },
      ...skipTake,
    })
  }
}
