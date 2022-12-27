import { Module } from '@nestjs/common'
import { SupervisorService } from './supervisor.service'
import { SupervisorResolver } from './supervisor.resolver'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  providers: [SupervisorService, SupervisorResolver],
  imports: [PrismaModule],
})
export class SupervisorModule {}
