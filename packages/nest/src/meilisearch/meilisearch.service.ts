import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { MeiliSearch } from 'meilisearch'
import { TimetableEvent } from '@prisma/client'

type ThinTimetableEvent = Pick<
  TimetableEvent,
  'id' | 'code' | 'startsAt' | 'groups' | 'hosts' | 'room' | 'type' | 'subject'
> & {
  plDate: string
  enDate: string
}

@Injectable()
export class MeilisearchService extends MeiliSearch implements OnModuleInit {
  private readonly logger = new Logger(MeilisearchService.name)
  private readonly eventIndex = this.index<ThinTimetableEvent>('events')

  constructor(private readonly prisma: PrismaService) {
    super({
      host: 'http://localhost:7700',
      apiKey: 'meilimk_catz_ily!',
    })
  }

  onModuleInit() {
    this.rebuildIndex(
      new Date(new Date().getTime() - 7 * 24 * 60 * 1000), // starting 7 days ago
      50_000, // limit to 50k events
    )
  }

  async rebuildIndex(since = new Date(), limit = 1_000) {
    this.logger.verbose(`Rebuilding index since ${since} with limit ${limit}`)
    const events = await this.prisma.timetableEvent.findMany({
      take: limit,
      where: {
        startsAt: {
          gte: since,
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
      select: {
        id: true,
        code: true,
        startsAt: true,
        groups: true,
        hosts: true,
        room: true,
        type: true,
        subject: true,
      },
    })

    const enqTask = await this.eventIndex.addDocuments(
      events.map((e) => ({
        ...e,
        plDate: new Date(e.startsAt).toLocaleString('pl', {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
        enDate: new Date(e.startsAt).toLocaleString('en', {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      })),
      {
        primaryKey: 'id',
      },
    )

    this.waitForTask(enqTask.taskUid).then((r) => {
      const begin = new Date(r.startedAt)
      const end = new Date(r.finishedAt)
      const duration = end.getTime() - begin.getTime()

      this.logger.verbose(
        `Index rebuild complete, took ${duration}ms, processed ${events.length} documents`,
      )
    })

    return enqTask
  }

  async search(query: string) {
    const response = await this.eventIndex.search(query, {
      limit: 25,
      showRankingScore: true,
    })

    console.log({ response, hits: response.hits })
  }
}
