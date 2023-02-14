import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { TimetableEvent, User } from '@prisma/client'
import { GqlQueryEventArgs, GqlQueryEventsArgs } from '../../gql'
import { BrowserService } from '../browser.service'

@Resolver('ScheduleEvent')
export class ScheduleEventResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  source(@Parent() event: TimetableEvent) {
    return this.browser.getSource(event.sourceId)
  }

  @ResolveField()
  next(
    @Context('user') user: User | undefined,
    @Parent() event: TimetableEvent
  ) {
    if (user) {
      return this.browser.findNextToEvent(user, event)
    }
    throw new Error('Feature not implemented for anonymous queries!')
  }

  @ResolveField()
  previous(
    @Context('user') user: User | undefined,
    @Parent() event: TimetableEvent
  ) {
    if (user) {
      return this.browser.findPreviousToNext(user, event)
    }
    throw new Error('Feature not implemented for anonymous queries!')
  }

  @Query()
  event(@Args() args: GqlQueryEventArgs) {
    return this.browser.getEvent(args.id)
  }

  @Query()
  events(@Args() args: GqlQueryEventsArgs) {
    return this.browser.find({ ...args.search, ...args.targets })
  }
}
