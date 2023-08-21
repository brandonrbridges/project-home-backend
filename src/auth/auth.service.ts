// Nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

// Services
import { MailService } from 'src/mail/mail.service'
import { UsersService } from 'src/users/users.service'

// DTOs
import { CreateUserDto } from 'src/users/dto/create-user.dto'

// Packages
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User } from 'src/users/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  async login(data: { email: string; password: string }): Promise<any> {
    data.email = data.email.toLowerCase()

    const user = await this.usersService.findByEmail(data.email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const authenticated = await bcrypt.compare(data.password, user.password)

    if (!authenticated) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user)

    const userObject = this.createUserObject(user)

    // this.mailService.loginNotification(user) // send login notification email

    return {
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: userObject,
      },
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(createUserDto.email)

    if (user) {
      throw new BadRequestException('User already exists')
    }

    createUserDto = this.formatNewUser(createUserDto)

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    })

    const accessToken = this.generateAccessToken(newUser)
    const refreshToken = this.generateRefreshToken(newUser)

    const userObject = this.createUserObject(newUser)

    return {
      message: 'Registration successful',
      data: {
        accessToken,
        refreshToken,
        user: userObject,
      },
    }
  }

  createUserObject = (user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, iat, exp, ...rest } = user

    return rest
  }

  formatNewUser = (user) => {
    // convert email to lowercase
    user.email = user.email.toLowerCase()

    // capitalise first letter of first and last name
    user.name.first =
      user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)
    user.name.last =
      user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)

    // remove trailing spaces
    user.name.first = user.name.first.trim()
    user.name.last = user.name.last.trim()

    return user
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const verified = jwt.verify(token, process.env.SECRET)

      const { _id } = verified as User

      const user = await this.usersService.findById(_id)

      const userObject = this.createUserObject(user)

      return {
        message: 'Token verified',
        data: {
          accessToken: this.generateAccessToken(verified),
          refreshToken: this.generateRefreshToken(verified),
          user: userObject,
        },
      }
    } catch (error) {
      throw new BadRequestException('Invalid token')
    }
  }

  generateAccessToken = (user: any) => {
    const userObject = this.createUserObject(user)

    const token = jwt.sign(userObject, process.env.SECRET, {
      expiresIn: '15m',
    })

    return token
  }

  generateRefreshToken = (user: any) => {
    const userObject = this.createUserObject(user)

    const token = jwt.sign(userObject, process.env.SECRET, {
      expiresIn: '7d',
    })

    return token
  }
}
