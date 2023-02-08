import { Query, Resolver, Args } from '@nestjs/graphql'
import { BrowserService } from './browser.service'

@Resolver('ScheduleEvent')
export class BrowserResolver {
  constructor(private readonly browser: BrowserService) {}

  @Query()
  getGroups() {
    return this.browser.getGroupsList()
  }

  @Query()
  autocompleteGroups(@Args('query') query: string) {
    return this.browser.autocompleteGroups(query)
  }

  @Query()
  findByDescription(@Args('query') query: string) {
    return this.browser.findByDescription(query)
  }
}
