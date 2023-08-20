// Nest
import { Controller, Get } from '@nestjs/common'

// Services
import { UsersService } from './users.service'

// Schema
import { User } from './user.schema'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }
}
