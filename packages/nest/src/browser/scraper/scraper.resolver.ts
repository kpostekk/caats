import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Scraper } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { BrowserService } from '../browser.service'

@Resolver('Scraper')
export class ScraperResolver {
  constructor(
    private readonly browser: BrowserService,
    private readonly prisma: PrismaService
  ) {}

  @Query()
  async scrapers() {
    return await this.prisma.scraper.findMany()
  }
}
