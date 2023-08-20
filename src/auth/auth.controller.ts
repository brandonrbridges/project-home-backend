// Nest
import { Body, Controller, HttpCode, Post } from '@nestjs/common'

// Services
import { AuthService } from './auth.service'

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() data: { email: string; password: string }): Promise<any> {
    return this.authService.login(data)
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto)
  }

  @Post('refresh-token')
  @HttpCode(200)
  verifyToken(@Body() data: { token: string }): Promise<any> {
    return this.authService.verifyToken(data.token)
  }
}
