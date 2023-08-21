// Nest
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Controller
import { TenanciesController } from './tenancies.controller'

// Services
import { TenanciesService } from './tenancies.service'

// Schema
import { Tenancy, TenancySchema } from './tenancy.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tenancy.name,
        schema: TenancySchema,
      },
    ]),
  ],
  providers: [TenanciesService],
  controllers: [TenanciesController],
})
export class TenanciesModule {}
