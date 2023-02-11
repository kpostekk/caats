import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { AuthGuard } from '../auth/auth.guard'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @UseGuards(AuthGuard)
  @Query()
  async user(@Context('user') user: User) {
    return this.users.getUser(user.id)
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async setGroups(
    @Context('user') user: User,
    @Args('groups') groups: string[]
  ) {
    await this.users.updateUser(user.id, { groups })
    return true
  }
}
