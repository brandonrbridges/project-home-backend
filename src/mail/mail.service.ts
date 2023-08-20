// Nest
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

// Schema
import { User } from 'src/users/user.schema'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm/${token}`

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your email address',
      template: './user-confirmation',
      context: {
        user: user,
        url: url,
      },
    })
  }

  async loginNotification(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Login Notification',
      template: './login-notification',
      context: {
        user: user,
      },
    })
  }
}
