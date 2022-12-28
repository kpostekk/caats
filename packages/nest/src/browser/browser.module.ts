import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { BrowserResolver } from './browser.resolver'
import { BrowserService } from './browser.service'

@Module({
  providers: [BrowserResolver, BrowserService],
  imports: [PrismaModule],
})
export class BrowserModule {}
