import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthGuard, ScraperGuard, SuperuserGuard } from './auth.guard'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  providers: [
    AuthService,
    AuthResolver,
    AuthGuard,
    SuperuserGuard,
    ScraperGuard,
  ],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
      }),
    }),
    forwardRef(() => UsersModule),
    PrismaModule,
  ],
  exports: [AuthGuard, SuperuserGuard, ScraperGuard, JwtModule],
})
export class AuthModule {}
