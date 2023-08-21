// Nest
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Controllers
import { InvitationsController } from './invitations.controller'

// Services
import { InvitationsService } from './invitations.service'

// Schema
import { Invitation, InvitationSchema } from './invitation.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invitation.name,
        schema: InvitationSchema,
      },
    ]),
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
