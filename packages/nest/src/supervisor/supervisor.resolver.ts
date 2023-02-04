import {
  ParseIntPipe,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { Scraper, TaskStatus, User } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { PubSub } from 'mercurius'
import { AuthGuard, ScraperGuard, SuperuserGuard } from '../auth/auth.guard'
import {
  GqlMutationCreateScraperArgs,
  GqlQueryGetTaskCollectionArgs,
  GqlTask,
  GqlTaskResult,
  GqlTasksBulkInput,
} from '../gql'
import { SupervisorService } from './supervisor.service'

@Resolver()
export class SupervisorResolver {
  constructor(private readonly supervisor: SupervisorService) {}

  @Query()
  async getTasks(): Promise<GqlTask[]> {
    return []
  }

  @UseGuards(ScraperGuard)
  @Mutation()
  async updateTaskState(
    @Args('id', ParseIntPipe) id: number,
    @Args('state') state: TaskStatus
  ) {
    await this.supervisor.updateTaskState(id, state)
    return true
  }

  @UseGuards(ScraperGuard)
  @Mutation()
  async finishTask(
    @Args('id', ParseIntPipe) id: number,
    @Args('result') { hash, result }: GqlTaskResult,
    @Context('scraper') scraper: Scraper
  ) {
    await this.supervisor.storeTaskResult(id, hash, result, scraper?.id)
    return true
  }

  @Query()
  async getTaskCollection(
    @Args() { collection }: GqlQueryGetTaskCollectionArgs
  ) {
    if (collection === 'HISTORICAL') {
      return await this.supervisor.getHistoricalTasks()
    } else if (collection === 'QUEUE') {
      return await this.supervisor.getPendingTasks()
    }
  }

  @UseGuards(AuthGuard, SuperuserGuard)
  @Mutation()
  createTasksBulk(@Args('input') input: GqlTasksBulkInput) {
    const offset = input.offset ?? 0

    return this.supervisor.createTasks(input.count - offset, offset)
  }

  @UseGuards(ScraperGuard)
  @Subscription()
  async receiveTask(
    @Context('pubsub') pubsub: PubSub,
    @Context('scraper') scraper: Scraper
  ) {
    const subscription = pubsub
      .subscribe(['newTask', scraper.id, scraper.ownerId])
      .then((i) => {
        return i.once('close', () => {
          this.supervisor.updateScraper(scraper.id, 'DISCONNECTED')
        })
      })

    await this.supervisor.updateScraper(scraper.id, 'AWAITING')
    await this.supervisor.dispatch()
    return subscription
  }

  @UseGuards(AuthGuard, SuperuserGuard)
  @Mutation()
  async createScraper(
    @Args() args: GqlMutationCreateScraperArgs,
    @Context('user') user: User
  ) {
    const [, token] = await this.supervisor.createScraper(user.id, args.name)
    return token
  }
}
