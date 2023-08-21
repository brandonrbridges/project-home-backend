// Nest
import { Module } from '@nestjs/common'

// Mongoose
import { MongooseModule } from '@nestjs/mongoose'

// Controllers
import { PropertiesController } from './properties.controller'

// Services
import { PropertiesService } from './properties.service'

// Schema
import { Property, PropertySchema } from './properties.schema'

// Modules
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
