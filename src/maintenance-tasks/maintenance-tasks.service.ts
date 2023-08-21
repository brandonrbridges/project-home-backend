// Nest
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Mongoose
import { Model } from 'mongoose'

// Schema
import { MaintenanceTask } from './maintenance-task.schema'

@Injectable()
export class MaintenanceTasksService {
  constructor(
    @InjectModel(MaintenanceTask.name)
    private readonly taskModel: Model<MaintenanceTask>,
  ) {}

  async findAll(): Promise<MaintenanceTask[]> {
    const data = await this.taskModel
      .find(null, {
        __v: false,
      })
      .exec()

    const array = data.map((item) => item.toObject())

    return array
  }

  async findOne(query: any): Promise<MaintenanceTask> {
    const data = await this.taskModel.findOne(query).exec()

    if (!data) {
      return null
    }

    return data.toObject()
  }

  async create(task: MaintenanceTask): Promise<MaintenanceTask> {
    const createdTask = new this.taskModel(task)

    return createdTask.save()
  }
}
