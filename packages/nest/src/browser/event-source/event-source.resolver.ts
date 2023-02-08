import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { TaskResult } from '@prisma/client'
import { BrowserService } from '../browser.service'

@Resolver('EventSource')
export class EventSourceResolver {
  constructor(private readonly browser: BrowserService) {}

  @ResolveField()
  task(@Parent() source: Pick<TaskResult, 'taskId'>) {
    return this.browser.getTask(source.taskId)
  }
}
