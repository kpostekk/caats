import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Response,
  Query,
  Header,
  Request,
  Redirect,
} from '@nestjs/common'
import { IcsService, SignedSubscriptionOptions } from './ics.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'

@Controller('ics')
export class IcsController {
  constructor(
    private readonly ics: IcsService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  @Get('cal.ics')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  async getCalForSignature(@Query('signature') signature: string) {
    const options: SignedSubscriptionOptions = await this.jwt.verifyAsync(
      signature
    )
    return await this.ics.readSignedSubscription(options)
  }

  @Get('s/:shortcut/cal.ics')
  @Redirect('ics/cal.ics', 308)
  async redirectResolvedShortcut(
    @Request() request: FastifyRequest,
    @Param('shortcut') shortcut: string
  ) {
    const { jwt } = await this.prisma.icsShortcuts.findUniqueOrThrow({
      where: {
        shortHash: shortcut,
      },
      select: {
        jwt: true,
      },
    })

    const redirectUrl = new URL(
      '/ics/cal.ics',
      this.config.getOrThrow('BASE_URL')
    )
    redirectUrl.searchParams.set('signature', jwt)

    return {
      url: redirectUrl.toString(),
    }
  }
}
