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
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().exist(),
        GOOGLE_SECRET: Joi.string().exist(),
        JWT_SECRET: Joi.string().exist().min(32),
      }),
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      typePaths: ['./**/*.gql'],
      definitions: {
        path: join(process.cwd(), 'src/_autogen/gql.ts'),
        emitTypenameField: true,
      },
      typeDefs: [...scalarTypeDefs],
      queryDepth: 4,
      graphiql: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'app', 'dist'),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SupervisorModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
