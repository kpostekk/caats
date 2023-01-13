import { ParseIntPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskStatus } from '@prisma/client'
import {
  GqlQueryGetTaskCollectionArgs,
  GqlTask,
  GqlTaskResult,
  GqlTasksBulkInput,
} from '../gql'
import { SupervisorService } from './supervisor.service'

@Resolver()
export class SupervisorResolver {
  constructor(private readonly supervisor: SupervisorService) {}

  @Query()
  async getTasks(): Promise<GqlTask[]> {
    const tasks = await this.supervisor.getPendingTasks()
    return tasks.map((task) => ({
      id: task.id.toString(),
      date: task.targetDate.toISOString().substring(0, 10),
      hash: task.initialHash,
    }))
  }

  @Mutation()
  async updateTaskState(
    @Args('id', ParseIntPipe) id: number,
    @Args('state') state: TaskStatus
  ) {
    await this.supervisor.updateTaskState(id, state)
    return true
  }

  @Mutation()
  async finishTask(
    @Args('id', ParseIntPipe) id: number,
    @Args('result') { hash, result }: GqlTaskResult
  ) {
    await this.supervisor.storeTaskResult(id, hash, result)
    return true
  }

  @Query()
  async getTaskCollection(
    @Args() { collection }: GqlQueryGetTaskCollectionArgs
  ) {
    if (collection === 'HISTORICAL') {
      return await this.supervisor.getHistoricalTasks()
    } else if (collection === 'QUEUE') {
      return await this.supervisor.getPendingTasks()
    }
  }

  @Mutation()
  createTasksBulk(@Args('input') input: GqlTasksBulkInput) {
    const offset = input.offset ?? 0

    return this.supervisor.createTasks(input.count - offset, offset)
  }
}
