// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

// Mongoose
import mongoose, { HydratedDocument } from 'mongoose'

export type MaintenanceTaskDocument = HydratedDocument<MaintenanceTask>

@Schema()
export class MaintenanceTask {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  property_id: mongoose.Schema.Types.ObjectId

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  submitted_by: mongoose.Schema.Types.ObjectId

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  assigned_to: mongoose.Schema.Types.ObjectId

  @Prop({
    type: String,
    required: true,
  })
  category: string

  @Prop({
    type: String,
    required: true,
  })
  description: string

  @Prop({
    type: String,
    required: true,
    enum: ['pending', 'assigned', 'in-progress', 'complete', 'paid'],
    default: 'pending',
  })
  status: string

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  created_at: Date
}

export const MaintenanceTaskSchema =
  SchemaFactory.createForClass(MaintenanceTask)
