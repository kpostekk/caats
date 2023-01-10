import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
