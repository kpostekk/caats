import { Query, Resolver, Args } from '@nestjs/graphql'
import { BrowserService } from './browser.service'

@Resolver()
export class BrowserResolver {
  constructor(private readonly browser: BrowserService) {}

  @Query()
  search(@Args('text') text: string) {
    return this.browser.search(text)
  }
}
