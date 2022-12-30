import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthGuard } from './auth.guard'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  providers: [AuthService, AuthResolver, AuthGuard],
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ConfigModule,
    forwardRef(() => UsersModule),
    PrismaModule,
  ],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
