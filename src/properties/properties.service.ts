// Nest
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Mongoose
import { Model } from 'mongoose'

// Schema
import { Property, PropertyDocument } from './properties.schema'

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: Model<PropertyDocument>,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyModel
      .find(null, {
        __v: false,
      })
      .exec()
  }

  async findById(id: string): Promise<Property> {
    return this.propertyModel
      .findById(id, {
        __v: false,
      })
      .exec()
  }

  async create(createPropertyDto: Property): Promise<Property> {
    const createdProperty = new this.propertyModel(createPropertyDto)

    return createdProperty.save()
  }
}
