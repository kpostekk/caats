import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { join } from 'path'
import { AppResolver } from './app.resolver'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SupervisorModule } from './supervisor/supervisor.module'
import Joi from 'joi'
import { ServeStaticModule } from '@nestjs/serve-static'
import { BrowserModule } from './browser/browser.module'
import { resolvers, typeDefs } from 'graphql-scalars'
import { IcsModule } from './ics/ics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { EmitterModule } from './emitter/emitter.module'
import { EmitterService } from './emitter/emitter.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().exist(),
        GOOGLE_SECRET: Joi.string().exist(),
        JWT_SECRET: Joi.string().exist().min(32),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [EmitterModule],
      inject: [EmitterService],
      useFactory: (emitter: EmitterService) => ({
        typePaths: ['./**/*.{gql,graphql}'],
        queryDepth: process.env.NODE_ENV !== 'development' ? 7 : Infinity,
        graphiql: true,
        typeDefs,
        resolvers,
        subscription: {
          emitter: emitter.getEmitter(),
        },
      }),
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'app', 'dist'),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SupervisorModule,
    BrowserModule,
    IcsModule,
    EmitterModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
