import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest } from 'fastify'
import { PrismaService } from '../prisma/prisma.service'
import { JwtPayload } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(execCtx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(execCtx).getContext()
    const request = context.req as FastifyRequest
    const { authorization } = request.headers

    if (!authorization) throw new UnauthorizedException()

    const [type, jwtString] = authorization.split(' ')
    if (type !== 'Bearer') throw new UnauthorizedException()

    try {
      const { sub: userId } = await this.jwtService.verifyAsync<JwtPayload>(
        jwtString
      )
      context.session = await this.prisma.userSession.findFirstOrThrow({
        where: {
          userId: userId,
          expiresAt: { gt: new Date() },
          revokedAt: null,
        },
      })
      context.user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
      })
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }
}
