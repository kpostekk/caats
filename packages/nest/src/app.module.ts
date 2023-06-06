import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common'
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql'
// import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
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
// import { EmitterModule } from './emitter/emitter.module'
// import { EmitterService } from './emitter/emitter.service'
// import { OpenAPI, useSofa } from 'sofa-api'
// import { HttpAdapterHost } from '@nestjs/core'
// import { FastifyInstance } from 'fastify'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { PubsubModule } from './pubsub/pubsub.module'
// import swagger from '@fastify/swagger'
// import swaggerUi from '@fastify/swagger-ui'

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
        BASE_URL: Joi.string()
          .uri({ scheme: ['http', 'https'] })
          .exist()
          .default('https://caats.app/'),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.{gql,graphql}'],
      typeDefs,
      resolvers,
      // playground: true,
      // installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      subscriptions: {
        'graphql-ws': true,
      },
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
    PubsubModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
