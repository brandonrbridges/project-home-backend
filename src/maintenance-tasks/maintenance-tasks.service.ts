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

  async findAll(query: { property_id?: string }): Promise<MaintenanceTask[]> {
    const data = await this.taskModel
      .find(query, {
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
    createdTask.identifier = this.generateIdentifier(createdTask.category)

    let existingTask: MaintenanceTask | null

    do {
      existingTask = await this.findOne({
        identifier: createdTask.identifier,
      })

      if (existingTask) {
        createdTask.identifier = this.generateIdentifier(createdTask.category)
      }
    } while (existingTask)

    return createdTask.save()
  }

  generateIdentifier(category: string): string {
    const categoryFirstCharacter = category.charAt(0).toUpperCase()
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000)

    return `${categoryFirstCharacter}/${randomSixDigitNumber}`
  }
}
