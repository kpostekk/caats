import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest } from 'fastify'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(execCtx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(execCtx).getContext()
    const request = context.req as FastifyRequest
    const { authorization } = request.headers

    if (!authorization) throw new UnauthorizedException()

    const [, token] = authorization.split(' ')
    try {
      const { sub: userId } = await this.jwtService.verifyAsync(token)
      context.userId = userId
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }
}
