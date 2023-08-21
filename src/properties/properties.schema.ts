// Nest
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

// Mongoose
import mongoose, { HydratedDocument } from 'mongoose'

export type PropertyDocument = HydratedDocument<Property>

@Schema()
export class Property {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  owner_id: mongoose.Schema.Types.ObjectId

  // virtual property
  owner?: {
    _id: string | mongoose.Schema.Types.ObjectId
    name: {
      first: string
      last: string
    }
  }

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

  @Prop({
    type: Number,
    required: true,
  })
  max_tenants: number

  @Prop({
    type: Array,
  })
  active_tenancies?: Array<mongoose.Schema.Types.ObjectId>
}

export const PropertySchema = SchemaFactory.createForClass(Property)
