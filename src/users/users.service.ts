// Nest
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Mongoose
import { Model } from 'mongoose'

// Schema
import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    const data = await this.userModel
      .find(null, {
        __v: false,
      })
      .exec()

    const array = data.map((item) => item.toObject())

    return array
  }

  async findById(id: string): Promise<User> {
    const data = await this.userModel
      .findById(id, {
        __v: false,
      })
      .exec()

    const obj = data.toObject()

    return obj
  }

  async findByEmail(email: string): Promise<User> {
    const data = await this.userModel
      .findOne(
        { email },
        {
          __v: false,
        },
      )
      .exec()

    const obj = data.toObject()

    return obj
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user)

    return createdUser.save()
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec()
  }
}
