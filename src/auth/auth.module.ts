// Nest
import { Module } from '@nestjs/common'

// Controllers
import { AuthController } from './auth.controller'

// Services
import { AuthService } from './auth.service'

// Modules
import { MailModule } from 'src/mail/mail.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [MailModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
