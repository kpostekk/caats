import { Injectable } from '@nestjs/common'
import { TimetableEvent } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { EventAttributes, createEvents } from 'ics'
import { DateTime } from 'luxon'
import { randProductAdjective, randAccessory, randNumber } from '@ngneat/falso'
import { randomBytes } from 'crypto'

@Injectable()
export class IcsService {
  constructor(private readonly prisma: PrismaService) {}

  private getSubscriptionName() {
    return randomBytes(8).toString('base64url')
  }

  async createSubscription(userId: string, groups: string[]) {
    const name = this.getSubscriptionName()
    await this.prisma.icsSubscriptions.create({
      data: {
        userId,
        includeGroups: groups,
        id: name,
      },
    })
    return name
  }

  async getEventsForSubscription(id: string) {
    const { includeGroups } =
      await this.prisma.icsSubscriptions.findFirstOrThrow({
        where: {
          id,
        },
        select: {
          includeGroups: true,
        },
      })

    const events = await this.prisma.timetableEvent.findMany({
      where: {
        groups: {
          hasSome: includeGroups,
        },
        source: {
          task: {
            status: 'SUCCESS',
          },
        },
      },
    })

    return events
  }

  getIcsEvents(events: TimetableEvent[]) {
    const icsEvents: EventAttributes[] = events.map((event) => {
      const startDt = DateTime.fromJSDate(event.startsAt)
      const endDt = DateTime.fromJSDate(event.endsAt)
      const lastModified = DateTime.fromJSDate(event.createdAt)

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
        }.\nProwadzący: ${event.hosts.join(', ')}`,
        organizer: {
          name: 'CaaTS',
          // email: 'calmaster@caats.app',
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
        url: `https://caats.app/app/event/${event.id}`,
      }
    })

    const { error, value } = createEvents(icsEvents)

    if (error) throw error

    return value
  }
}
