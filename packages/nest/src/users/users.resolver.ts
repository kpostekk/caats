import { forwardRef, Inject, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { AuthGuard } from '../auth/auth.guard'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @UseGuards(AuthGuard)
  @Query()
  async me(@Context('user') user: User) {
    return this.users.getUser(user.id)
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async addGroup(@Context('user') user: User, @Args('group') group: string) {
    const { groups } = await this.users.getUser(user.id)
    if (groups.includes(group)) return groups

    await this.users.updateUser(user.id, { groups: [...groups, group] })
    return [...groups, group]
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
