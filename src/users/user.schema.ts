// Nest
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

// Mongoose
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  _id?: string

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Prop(
    raw({
      first: { type: String, required: true },
      last: { type: String, required: true },
    }),
  )
  name: {
    first: string
    last: string
  }

  @Prop({
    type: String,
    unique: true,
  })
  phone: string

  @Prop({
    type: Array,
    enum: ['tenant', 'landlord', 'agency', 'admin'],
    default: ['landlord'],
  })
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
