import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Task, TaskResult } from '@prisma/client'
import { BrowserService } from '../browser.service'

@Resolver('StoredTask')
export class StoredTaskResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  async scraper(@Parent() event: Pick<Task, 'workerId'>) {
    if (!event.workerId) return null
    return await this.browser.getScraper(event.workerId)
  }
}
