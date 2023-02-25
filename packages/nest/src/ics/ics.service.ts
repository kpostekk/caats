import { Injectable } from '@nestjs/common'
import { TimetableEvent, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { EventAttributes, createEvents } from 'ics'
import { DateTime } from 'luxon'
import { createHash, randomBytes } from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

export type SignedSubscriptionOptions = {
  groups?: string[]
  user?: Pick<User, 'id'>
  hosts?: string[]
}

@Injectable()
export class IcsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  async createSignedSubscription(
    options: SignedSubscriptionOptions,
    user?: Pick<User, 'id'>
  ) {
    const token = await this.jwt.signAsync(options)

    const shortcut = user
      ? await this.prisma.icsShortcuts.create({
          data: {
            shortHash: createHash('sha1')
              .update(token)
              .digest('base64url')
              .slice(0, 12),
            jwt: token,
            userId: user.id,
          },
        })
      : null

    return { token, shortcut }
  }

  async readSignedSubscription(options: SignedSubscriptionOptions) {
    const groups = options.user
      ? await this.prisma.user
          .findMany({
            where: {
              id: options.user.id,
            },
            select: {
              groups: true,
            },
          })
          .then((v) => v.reduce((pv, cv) => pv.concat(cv.groups), []))
      : options.groups

    const events = await this.prisma.timetableEvent.findMany({
      where: {
        groups: {
          hasSome: groups,
        },
        hosts: options.hosts
          ? {
              hasSome: options.hosts,
            }
          : undefined,
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
    })

    return this.getIcsEvents(events)
  }

  getIcsEvents(events: TimetableEvent[]) {
    const icsEvents: EventAttributes[] = events.map((event) => {
      const startDt = DateTime.fromJSDate(event.startsAt)
      const endDt = DateTime.fromJSDate(event.endsAt)
      const lastModified = DateTime.fromJSDate(event.createdAt)
      const url = new URL(
        `/app/event/${event.id}`,
        this.config.getOrThrow('BASE_URL')
      )

      return {
        start: [
          startDt.year,
          startDt.month,
          startDt.day,
          startDt.hour,
          startDt.minute,
        ],
        duration: endDt.diff(startDt).shiftTo('hours', 'minutes').toObject(),
        title: `${event.code} - ${event.type} (${event.room})`,
        description: `${event.type} z ${event.subject} w sali ${
          event.room
        }.\nProwadzący: ${event.hosts.join(', ')}.`,
        organizer: {
          name: 'CaaTS',
          email: `calendar@${url.hostname}`,
        },
        alarms: [
          {
            action: 'display',
            trigger: {
              minutes: 15,
              before: true,
            },
          },
        ],
        lastModified: [
          lastModified.year,
          lastModified.month,
          lastModified.day,
          lastModified.hour,
          lastModified.minute,
        ],
        url: url.toString(),
        uid: 'caats-ev-' + event.id,
      }
    })

    const { error, value } = createEvents(icsEvents)

    if (error) throw error

    return value
  }
}
