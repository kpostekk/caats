import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { AuthGuard } from '../auth/auth.guard'
import { IcsService } from './ics.service'

@Resolver()
export class IcsResolver {
  constructor(private readonly ics: IcsService) {}

  @UseGuards(AuthGuard)
  @Mutation()
  async createSubscription(
    @Context('user') user: User,
    @Args('groups') groups: string[]
  ) {
    const name = await this.ics.createSubscription(user.id, groups)
    return name
  }
}
