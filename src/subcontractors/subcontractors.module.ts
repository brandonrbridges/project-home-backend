// Nest
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Controllers
import { SubcontractorsController } from './subcontractors.controller'

// Services
import { SubcontractorsService } from './subcontractors.service'

// Schema
import { Subcontractor, SubcontractorSchema } from './subcontractors.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subcontractor.name,
        schema: SubcontractorSchema,
      },
    ]),
  ],
  controllers: [SubcontractorsController],
  providers: [SubcontractorsService],
  exports: [SubcontractorsService],
})
export class SubcontractorsModule {}
