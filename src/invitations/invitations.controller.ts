// Nest
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common'

// Services
import { InvitationsService } from './invitations.service'

// Schema
import { Invitation } from './invitation.schema'

// DTOs
import { CreateInvitationDto } from './dto/create-invitation'

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  // GET /invitations with dynamic query
  @Get()
  @HttpCode(200)
  find(
    @Query() query: { property_id?: string },
  ): Promise<Invitation | Invitation[]> {
    if (query) {
      return this.invitationsService.findOne(query)
    } else {
      return this.invitationsService.findAll()
    }
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string): Promise<Invitation> {
    return this.invitationsService.findById(id)
  }

  @Post('create')
  @HttpCode(201)
  create(@Body() createDto: CreateInvitationDto): Promise<Invitation> {
    return this.invitationsService.create(createDto)
  }
}
