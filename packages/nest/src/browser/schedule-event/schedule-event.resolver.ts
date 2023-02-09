import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { TimetableEvent, User } from '@prisma/client'
import { GqlQueryEventArgs } from '../../gql'
import { BrowserService } from '../browser.service'

@Resolver('ScheduleEvent')
export class ScheduleEventResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  source(@Parent() event: TimetableEvent) {
    return this.browser.getSource(event.sourceId)
  }

  @ResolveField()
  next(@Context('user') user: User, @Parent() event: TimetableEvent) {
    return this.browser.findNextToEvent(user, event)
  }

  @ResolveField()
  previous(@Context('user') user: User, @Parent() event: TimetableEvent) {
    return this.browser.findPreviousToNext(user, event)
  }

  @Query()
  event(@Args() args: GqlQueryEventArgs) {
    return this.browser.getEvent(args.id)
  }
}
