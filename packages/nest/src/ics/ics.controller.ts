import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Response,
} from '@nestjs/common'
import { IcsService } from './ics.service'
import { FastifyReply } from 'fastify'

@Controller('ics')
export class IcsController {
  constructor(private readonly ics: IcsService) {}

  @Get(':sub.ics')
  async getCalendarForSubscription(
    @Response() response: FastifyReply,
    @Param('sub') sub: string
  ) {
    try {
      const events = await this.ics.getEventsForSubscription(sub)
      response.header('Content-Type', 'text/calendar')
      response.send(this.ics.getIcsEvents(events))
    } catch {
      throw new NotFoundException()
    }
  }

  @Get('u/:id.ics')
  async getCalendarForUser(
    @Response() response: FastifyReply,
    @Param('id') id: string
  ) {
    try {
      const events = await this.ics.getEventsForUser({ id })
      response.header('Content-Type', 'text/calendar')
      response.send(this.ics.getIcsEvents(events))
    } catch {
      throw new NotFoundException()
    }
  }
}
