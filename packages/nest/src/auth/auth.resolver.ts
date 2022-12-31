import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { UserSession } from '@prisma/client'
import { LoginResponse } from '../_autogen/gql'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation()
  async authGoogle(@Args('code') code: string): Promise<LoginResponse> {
    const user = await this.auth.loginWithGoogle(code)
    const { accessToken, sessionId } = await this.auth.createSession(user.id)
    return { accessToken, user, sessionId }
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async logout(@Context('session') session: UserSession): Promise<boolean> {
    await this.auth.revokeSession(session.id)
    return false
  }
}
