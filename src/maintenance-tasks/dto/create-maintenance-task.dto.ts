import mongoose from 'mongoose'

export class CreateMaintenanceTaskDto {
  property_id: mongoose.Schema.Types.ObjectId

  submitted_by: mongoose.Schema.Types.ObjectId

  category: string

  description: string
}
