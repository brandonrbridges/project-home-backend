// Nest
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

// Mongoose
import mongoose, { HydratedDocument } from 'mongoose'

export type InvitationDocument = HydratedDocument<Invitation>

@Schema()
export class Invitation {
  @Prop({
    type: String,
    enum: ['tenant'],
  })
  type: 'tenant'

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  sender_id: mongoose.Schema.Types.ObjectId

  @Prop({
    type: String,
  })
  recipient_email: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  property_id: mongoose.Schema.Types.ObjectId

  @Prop(
    raw({
      first: { type: String },
      last: { type: String },
    }),
  )
  name: {
    first: string
    last: string
  }

  @Prop({
    type: Object,
  })
  details: {
    [key: string]: {
      required: boolean
      info_type: string | Array<any> | File
    }
  }

  @Prop({
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected'

  @Prop({
    type: Date,
    default: Date.now,
  })
  date?: Date
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation)
