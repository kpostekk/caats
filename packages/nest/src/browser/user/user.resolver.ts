import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { GqlUserEventsArgs } from '../../gql'
import { BrowserService } from '../browser.service'

@Resolver('User')
export class UserResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  async events(@Args() args: GqlUserEventsArgs, @Context('user') user: User) {
    return await this.browser.find({ ...args.search, user })
  }

  @ResolveField()
  async nextEvent(@Context('user') user: User) {
    return await this.browser.findNext(user)
  }

  @ResolveField()
  async currentEvent(@Context('user') user: User) {
    return await this.browser.findCurrent(user)
  }
}
