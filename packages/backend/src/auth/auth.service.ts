import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { OAuth2Client } from 'google-auth-library'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  private readonly googleAuth: OAuth2Client

  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
    private readonly config: ConfigService
  ) {
    this.googleAuth = new OAuth2Client({
      clientId: this.config.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: this.config.getOrThrow('GOOGLE_SECRET'),
      redirectUri: 'postmessage', // THIS SHIT IS IMPORTANT, OK?
    })
  }

  async loginWithGoogle(code: string) {
    const { tokens } = await this.googleAuth.getToken(code)
    this.googleAuth.setCredentials(tokens)
    const { data } = await this.googleAuth.request<{
      email: string
      name?: string
      picture?: string
    }>({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    })

    return await this.users.createUserIfNotExists(
      data.email,
      data.name,
      data.picture
    )
  }

  async createSession(userId: string) {
    const user = await this.users.getUser(userId)
    if (!user) throw new UnauthorizedException()

    return {
      accessToken: await this.jwt.signAsync({
        sub: user.id,
      }),
    }
  }
}
