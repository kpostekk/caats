import { UseGuards } from '@nestjs/common'
import { Query, Resolver, Args, Context } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { AuthGuard } from '../auth/auth.guard'
import {
  GqlGroupInput,
  GqlHostInput,
  GqlQueryGetEventHistoryArgs,
  GqlSinceUntil,
  GqlSkipTake,
} from '../gql'
import { BrowserService } from './browser.service'

@Resolver()
export class BrowserResolver {
  constructor(private readonly browser: BrowserService) {}

  @UseGuards(AuthGuard)
  @Query()
  async getScheduleUser(
    @Context('user') user: User,
    @Args('sinceUntil') sinceUntil?: GqlSinceUntil,
    @Args('skipTake') skipTake?: GqlSkipTake
  ) {
    const result = await this.browser.findByUser(user.id, sinceUntil, skipTake)
    return result
  }

  @Query()
  async getScheduleGroups(
    @Args('groups') groups: GqlGroupInput,
    @Args('sinceUntil') sinceUntil?: GqlSinceUntil,
    @Args('skipTake') skipTake?: GqlSkipTake
  ) {
    const result = await this.browser.findByGroups(
      groups.groups,
      sinceUntil,
      skipTake
    )
    return result
  }

  @Query()
  async getScheduleHosts(
    @Args('host') host: GqlHostInput,
    @Args('sinceUntil') sinceUntil?: GqlSinceUntil,
    @Args('skipTake') skipTake?: GqlSkipTake
  ) {
    const result = await this.browser.findByHost(
      host.host,
      sinceUntil,
      skipTake
    )
    return result
  }

  @Query()
  getGroups() {
    return this.browser.getGroupsList()
  }

  @Query()
  autocompleteGroups(@Args('query') query: string) {
    return this.browser.autocompleteGroups(query)
  }

  @Query()
  getEventHistory(@Args() { constantId }: GqlQueryGetEventHistoryArgs) {
    return this.browser.getEventHistory(constantId)
  }

  @Query()
  findByDescription(@Args('query') query: string) {
    return this.browser.findByDescription(query)
  }
}
