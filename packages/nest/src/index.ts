import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  app.enableCors()

  process.on('SIGINT', () => void app.close().then(() => process.exit(0)))
  process.on('SIGTERM', () => void app.close().then(() => process.exit(0)))

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
