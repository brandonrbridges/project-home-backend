import mongoose from 'mongoose'

export class CreateMaintenanceTaskDto {
  property_id: mongoose.Schema.Types.ObjectId

  submitted_by: mongoose.Schema.Types.ObjectId

  assigned_to: mongoose.Schema.Types.ObjectId

  category: string

  description: string

  status: string

  created_at: Date
}
