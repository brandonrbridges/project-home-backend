// Nest
import { NestFactory } from '@nestjs/core'

// Modules
import { AppModule } from './app.module'

// Adapters
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  })

  app.setGlobalPrefix('v1')

  app.useWebSocketAdapter(new WsAdapter(app))

  await app.listen(4000)
}

bootstrap()
