import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { AuthGuard } from '../auth/auth.guard'
import { GqlMutationCreateSubscriptionArgs } from '../gql'
import { IcsService } from './ics.service'

@Resolver()
export class IcsResolver {
  constructor(private readonly ics: IcsService) {}

  @UseGuards(AuthGuard)
  @Mutation()
  async createSubscription(
    @Context('user') user: User,
    @Args() { options }: GqlMutationCreateSubscriptionArgs,
    @Context('req') request: FastifyRequest
  ) {
    const signature = await this.ics.createSignedSubscription(
      options.user
        ? { ...options, user: { id: user.id } }
        : { ...options, user: undefined },
      user
    )

    const fullUrl = new URL(request.headers.origin)
    fullUrl.searchParams.set('signature', signature.token)
    fullUrl.pathname = '/ics/cal.ics'

    const shortcutUrl = new URL(request.headers.origin)
    if (signature.shortcut) {
      shortcutUrl.pathname = `/ics/s/${signature.shortcut.shortHash}/cal.ics`
    }

    return {
      full: fullUrl.toString(),
      short: signature.shortcut ? shortcutUrl.toString() : null,
    }
  }
}
