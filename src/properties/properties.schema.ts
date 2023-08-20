// Nest
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

// Mongoose
import * as Mongoose from 'mongoose'

export type PropertyDocument = Mongoose.HydratedDocument<Property>

@Schema()
export class Property {
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  owner_id: Mongoose.Schema.Types.ObjectId

  @Prop(
    raw({
      line_1: { type: String, required: true },
      line_2: { type: String, required: false },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postal_code: { type: String, required: true },
    }),
  )
  address: {
    line_1: string
    line_2: string
    city: string
    state: string
    country: string
    postal_code: string
  }

  @Prop({
    type: String,
    required: true,
    enum: ['apartment', 'house', 'condo', 'townhouse', 'other'],
  })
  type: string

  @Prop({
    type: Number,
    required: true,
  })
  bedrooms: number

  @Prop({
    type: Number,
    required: true,
  })
  bathrooms: number

  @Prop(
    raw({
      amount: { type: Number, required: true },
      start_date: { type: Date, required: true },
      frequency: {
        type: String,
        required: true,
        enum: ['weekly', 'biweekly', 'monthly', 'yearly'],
      },
    }),
  )
  rent: {
    amount: number
    start_date: Date
    frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  }

  @Prop({
    type: Number,
    required: true,
  })
  deposit: number
}

export const PropertySchema = SchemaFactory.createForClass(Property)
