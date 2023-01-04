import { UseGuards } from '@nestjs/common'
import { Query, Resolver, Args, Context } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { GroupInput, HostInput, SinceUntil, SkipTake } from '../_autogen/gql'
import { AuthGuard } from '../auth/auth.guard'
import { BrowserService } from './browser.service'
import {} from '../_autogen/gql'

@Resolver()
export class BrowserResolver {
  constructor(private readonly browser: BrowserService) {}

  @UseGuards(AuthGuard)
  @Query()
  async getScheduleUser(
    @Context('user') user: User,
    @Args('sinceUntil') sinceUntil?: SinceUntil,
    @Args('skipTake') skipTake?: SkipTake
  ) {
    const result = await this.browser.findByUser(user.id, sinceUntil, skipTake)
    return result.map((r) => ({ ...r, subject: r.name }))
  }

  @Query()
  async getScheduleGroups(
    @Args('groups') groups: GroupInput,
    @Args('sinceUntil') sinceUntil?: SinceUntil,
    @Args('skipTake') skipTake?: SkipTake
  ) {
    const result = await this.browser.findByGroups(
      groups.groups,
      sinceUntil,
      skipTake
    )
    return result.map((r) => ({ ...r, subject: r.name }))
  }

  @Query()
  async getScheduleHosts(
    @Args('host') host: HostInput,
    @Args('sinceUntil') sinceUntil?: SinceUntil,
    @Args('skipTake') skipTake?: SkipTake
  ) {
    const result = await this.browser.findByHost(
      host.host,
      sinceUntil,
      skipTake
    )
    return result.map((r) => ({ ...r, subject: r.name }))
  }

  @Query()
  getGroups() {
    return this.browser.getGroupsList()
  }

  @Query()
  autocompleteGroups(@Args('query') query: string) {
    return this.browser.autocompleteGroups(query)
  }
}
