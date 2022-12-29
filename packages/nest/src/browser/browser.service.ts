import { Injectable } from '@nestjs/common'
import { SinceUntil } from '../_autogen/gql'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(id: string, sinceUntil?: SinceUntil) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    })

    console.log({
      startsAt: {
        gte: sinceUntil?.since && new Date(sinceUntil.since),
      },
      endsAt: {
        lte: sinceUntil?.until && new Date(sinceUntil.until),
      },
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
    })
  }

  async findByGroups(groups: string[], sinceUntil?: SinceUntil) {
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
    })
  }

  async findByHost(host: string) {
    return this.prisma.timetableEvent.findMany({
      where: {
        hosts: {
          has: host,
        },
      },
    })
  }
}
