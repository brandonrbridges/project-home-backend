import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import mongoose, { HydratedDocument } from 'mongoose'

export type TenancyDocument = HydratedDocument<Tenancy>

@Schema()
export class Tenancy {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  property_id: mongoose.Schema.Types.ObjectId

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  tenant_id: mongoose.Schema.Types.ObjectId

  @Prop({
    type: Date,
    required: true,
  })
  start_date: Date

  @Prop({
    type: Date,
    required: true,
  })
  end_date: Date

  @Prop({
    type: Number,
    required: true,
  })
  rent: number

  @Prop({
    type: Number,
    required: true,
  })
  deposit: number

  @Prop({
    type: String,
    required: true,
    enum: ['week', 'biweek', 'month', 'year'],
  })
  frequency: string

  @Prop({
    type: String,
  })
  agreement_file: string
}

export const TenancySchema = SchemaFactory.createForClass(Tenancy)
