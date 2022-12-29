import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { BrowserResolver } from './browser.resolver'
import { BrowserService } from './browser.service'

@Module({
  providers: [BrowserResolver, BrowserService],
  imports: [PrismaModule, AuthModule],
})
export class BrowserModule {}
