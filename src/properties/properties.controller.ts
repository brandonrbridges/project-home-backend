// Nest
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'

// Services
import { PropertiesService } from './properties.service'

// Schema
import { Property } from './properties.schema'

// DTOs
import { CreatePropertyDto } from './dto/create-property.dto'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.findById(id)
  }

  @Post('create')
  @HttpCode(201)
  create(@Body() createDto: CreatePropertyDto): Promise<Property> {
    return this.propertiesService.create(createDto)
  }
}
