// Nest
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'

// Services
import { MaintenanceTasksService } from './maintenance-tasks.service'

// Schema
import { MaintenanceTask } from './maintenance-task.schema'

// DTOs
import { CreateMaintenanceTaskDto } from './dto/create-maintenance-task.dto'

@Controller('maintenance-tasks')
export class MaintenanceTasksController {
  constructor(
    private readonly maintenanceTasksService: MaintenanceTasksService,
  ) {}

  // GET /maintenance-tasks with dynamic query
  @Get()
  @HttpCode(200)
  find(
    @Query() query: { property_id?: string },
  ): Promise<MaintenanceTask | MaintenanceTask[]> {
    if (query) {
      return this.maintenanceTasksService.findOne(query)
    } else {
      return this.maintenanceTasksService.findAll()
    }
  }

  @Post('create')
  @HttpCode(201)
  create(
    @Body() createDto: CreateMaintenanceTaskDto,
  ): Promise<MaintenanceTask> {
    return this.maintenanceTasksService.create(createDto)
  }
}
