// Nest
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

// Mongoose
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  email: string

  @Prop()
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

  @Prop()
  role: string

  @Prop()
  phone: string
}

export const UserSchema = SchemaFactory.createForClass(User)
