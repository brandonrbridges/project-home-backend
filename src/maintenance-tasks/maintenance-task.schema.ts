// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

// Mongoose
import mongoose, { HydratedDocument } from 'mongoose'

export type MaintenanceTaskDocument = HydratedDocument<MaintenanceTask>

const TaskCategoriesEnum = [
  'carpentry',
  'electrical',
  'general',
  'plumbing',
  'structural',
  'other',
]

const TaskStatusEnum = [
  'pending',
  'assigned',
  'in-progress',
  'complete',
  'paid',
]

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
  })
  assigned_to?: mongoose.Schema.Types.ObjectId

  @Prop({
    type: String,
    required: true,
    enum: TaskCategoriesEnum,
    default: 'general',
  })
  category: string

  // example: E/12345
  @Prop({
    type: String,
  })
  identifier?: string

  @Prop({
    type: String,
    required: true,
  })
  description: string

  @Prop({
    type: String,
    enum: TaskStatusEnum,
    default: 'pending',
  })
  status?: string

  @Prop({
    type: Date,
    default: Date.now,
  })
  created_at?: Date
}

export const MaintenanceTaskSchema =
  SchemaFactory.createForClass(MaintenanceTask)
