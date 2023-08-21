// Mongoose
import mongoose from 'mongoose'

type InvitationType = 'tenant'
type InvitationStatus = 'pending' | 'accepted' | 'rejected'

export class CreateInvitationDto {
  type: InvitationType

  sender_id: mongoose.Schema.Types.ObjectId

  recipient_email: string

  property_id: mongoose.Schema.Types.ObjectId

  name: {
    first: string
    last: string
  }

  details: {
    [key: string]: {
      required: boolean
      info_type: string | Array<any> | File
    }
  }

  status: InvitationStatus
}

// the details object is a dynamic object that can have any number of properties
