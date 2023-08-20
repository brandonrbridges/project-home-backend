// Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

// Mongoose
import { HydratedDocument } from 'mongoose'

export type SubcontractorDocument = HydratedDocument<Subcontractor>

@Schema()
export class Subcontractor {
  @Prop()
  name: string
}

export const SubcontractorSchema = SchemaFactory.createForClass(Subcontractor)
