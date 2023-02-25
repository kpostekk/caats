import { Module } from '@nestjs/common'
import { IcsService } from './ics.service'
import { IcsResolver } from './ics.resolver'
import { IcsController } from './ics.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [IcsService, IcsResolver],
  controllers: [IcsController],
  imports: [PrismaModule, AuthModule, ConfigModule],
})
export class IcsModule {}
