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
// import { PubSub } from 'mercurius'
import { AuthGuard, ScraperGuard, SuperuserGuard } from '../auth/auth.guard'
import {
  GqlMutationCreateScraperArgs,
  GqlTask,
  GqlTaskResult,
  GqlTasksBulkInput,
} from '../gql'
import { SupervisorService } from './supervisor.service'
import { PubSub } from 'graphql-subscriptions'
import { PubsubService } from '../pubsub/pubsub.service'

@Resolver()
export class SupervisorResolver {
  constructor(
    private readonly supervisor: SupervisorService,
    private readonly pubsub: PubsubService
  ) {}

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

  @UseGuards(AuthGuard, SuperuserGuard)
  @Mutation()
  createTasksBulk(@Args('input') input: GqlTasksBulkInput) {
    const offset = input.offset ?? 0

    return this.supervisor.createTasks(input.count - offset, offset)
  }

  @UseGuards(ScraperGuard)
  @Subscription()
  async receiveTask(@Context('scraper') scraper: Scraper) {
    const asyncIterator = this.pubsub.asyncData(
      ['newTask', scraper.id, scraper.ownerId],
      () => {
        this.supervisor.updateScraper(scraper.id, 'DISCONNECTED')
      }
    )

    return asyncIterator
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

  @Query()
  ongoingScrapers() {
    return this.supervisor.getOngoingScrapers()
  }
}
