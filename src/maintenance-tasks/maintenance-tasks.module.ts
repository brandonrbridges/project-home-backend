// Nest
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Services
import { MaintenanceTasksService } from './maintenance-tasks.service'

// Controllers
import { MaintenanceTasksController } from './maintenance-tasks.controller'

// Schema
import {
  MaintenanceTask,
  MaintenanceTaskSchema,
} from './maintenance-task.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MaintenanceTask.name,
        schema: MaintenanceTaskSchema,
      },
    ]),
  ],
  providers: [MaintenanceTasksService],
  controllers: [MaintenanceTasksController],
})
export class MaintenanceTasksModule {}
