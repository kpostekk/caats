import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { LoginResponse } from 'src/_autogen/gql'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation()
  async authGoogle(@Args('code') code: string): Promise<LoginResponse> {
    const user = await this.auth.loginWithGoogle(code)
    const { accessToken } = await this.auth.createSession(user.id)
    return { accessToken, user }
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async logout(): Promise<boolean> {
    return false
  }
}
