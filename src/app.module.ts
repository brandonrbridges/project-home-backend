// Nest
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// Mongoose
import { MongooseModule } from '@nestjs/mongoose'

// Controllers
import { AppController } from './app.controller'

// Services
import { AppService } from './app.service'

// Modules
import { AuthModule } from './auth/auth.module'
import { PropertiesModule } from './properties/properties.module'
import { SocketModule } from './socket/socket.module'
import { SubcontractorsModule } from './subcontractors/subcontractors.module'
import { UsersModule } from './users/users.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    PropertiesModule,
    SocketModule,
    SubcontractorsModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
