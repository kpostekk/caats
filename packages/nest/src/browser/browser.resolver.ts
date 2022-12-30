import { UseGuards } from '@nestjs/common'
import { Query, Resolver, Args, Context } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { GroupInput, SinceUntil, SkipTake } from '../_autogen/gql'
import { AuthGuard } from '../auth/auth.guard'
import { BrowserService } from './browser.service'

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
  async getScheduleGroups(@Args('input') input: GroupInput) {
    const result = await this.browser.findByGroups(input.groups)
    return result.map((r) => ({ ...r, subject: r.name }))
  }
}
