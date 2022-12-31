import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { OAuth2Client } from 'google-auth-library'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'

export type JwtPayload = {
  sub: string
  iat: number
  exp: number
  sid: string
}

@Injectable()
export class AuthService {
  private readonly googleAuth: OAuth2Client

  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
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

  async validateSession(sessionId: string) {
    const session = await this.prisma.userSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) throw new UnauthorizedException()

    return session
  }

  async createSession(userId: string) {
    const user = await this.users.getUser(userId)
    const session = await this.prisma.userSession.create({
      data: {
        userId,
      },
    })
    if (!user) throw new UnauthorizedException()

    return {
      accessToken: await this.jwt.signAsync({
        sub: user.id,
        iat: session.createdAt.getTime(),
        exp: session.expiresAt.getTime(),
        sid: session.id,
      }),
    }
  }
}
