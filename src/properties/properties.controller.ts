// Nest
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'

// Services
import { PropertiesService } from './properties.service'
import { UsersService } from 'src/users/users.service'

// Schema
import { Property } from './properties.schema'

// DTOs
import { CreatePropertyDto } from './dto/create-property.dto'

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Property[]> {
    const properties = await this.propertiesService.findAll()

    return Promise.all(
      properties.map(async (property) => {
        const owner = await this.usersService.findById(property.owner_id)

        return {
          ...property,
          owner: {
            _id: owner._id,
            name: owner.name,
          },
        }
      }),
    )
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<Property> {
    const property = await this.propertiesService.findById(id)
    const owner = await this.usersService.findById(property.owner_id)

    return {
      ...property,
      owner: {
        _id: owner._id,
        name: owner.name,
      },
    }
  }

  @Post('create')
  @HttpCode(201)
  create(@Body() createDto: CreatePropertyDto): Promise<Property> {
    return this.propertiesService.create(createDto)
  }
}
