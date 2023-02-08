import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TimetableEvent } from '@prisma/client'
import { GqlQueryEventArgs } from '../../gql'
import { BrowserService } from '../browser.service'

@Resolver('ScheduleEvent')
export class ScheduleEventResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  async source(@Parent() event: TimetableEvent) {
    return await this.browser.getSource(event.sourceId)
  }

  @Query()
  event(@Args() args: GqlQueryEventArgs) {
    return this.browser.getEvent(args.id)
  }
}
