import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthGuard } from './auth.guard'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [AuthService, AuthResolver, AuthGuard],
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ConfigModule,
    UsersModule,
  ],
})
export class AuthModule {}
