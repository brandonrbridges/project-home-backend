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
    const properties = await this.propertyModel
      .find(null, {
        __v: false,
      })
      .exec()

    if (!properties) {
      throw new Error('Properties not found')
    }

    return properties.map((property) => property.toObject())
  }

  async findById(id: string): Promise<Property> {
    const property = await this.propertyModel
      .findById(id, {
        __v: false,
      })
      .exec()

    if (!property) {
      throw new Error('Property not found')
    }

    return property.toObject()
  }

  async create(createPropertyDto: Property): Promise<Property> {
    const createdProperty = new this.propertyModel(createPropertyDto)

    return createdProperty.save()
  }
}
