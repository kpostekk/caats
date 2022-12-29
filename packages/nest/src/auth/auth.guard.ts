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

    const [, token] = authorization.split(' ')
    try {
      const { sub: userId } = await this.jwtService.verifyAsync(token)
      context.userId = userId
      context.user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
      })
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }
}
