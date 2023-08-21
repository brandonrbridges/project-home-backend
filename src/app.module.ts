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
import { InvitationsModule } from './invitations/invitations.module'
import { MailModule } from './mail/mail.module'
import { MaintenanceTasksModule } from './maintenance-tasks/maintenance-tasks.module'
import { PropertiesModule } from './properties/properties.module'
import { SocketModule } from './socket/socket.module'
import { SubcontractorsModule } from './subcontractors/subcontractors.module'
import { UsersModule } from './users/users.module'
import { TenanciesModule } from './tenancies/tenancies.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    InvitationsModule,
    MailModule,
    MaintenanceTasksModule,
    PropertiesModule,
    SocketModule,
    SubcontractorsModule,
    UsersModule,
    TenanciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
