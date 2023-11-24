import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { BrowserResolver } from './browser.resolver'
import { BrowserService } from './browser.service'
import { StoredTaskResolver } from './stored-task/stored-task.resolver'
import { UserResolver } from './user/user.resolver'
import { ScheduleEventResolver } from './schedule-event/schedule-event.resolver'
import { ScraperResolver } from './scraper/scraper.resolver'
import { EventSourceResolver } from './event-source/event-source.resolver'
import { MeilisearchModule } from '../meilisearch/meilisearch.module'

@Module({
  providers: [
    BrowserResolver,
    BrowserService,
    StoredTaskResolver,
    UserResolver,
    ScheduleEventResolver,
    ScraperResolver,
    EventSourceResolver,
  ],
  imports: [PrismaModule, AuthModule, MeilisearchModule],
})
export class BrowserModule {}
