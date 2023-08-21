// Nest
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Mongoose
import mongoose, { Model } from 'mongoose'

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

  async findById(id: string | mongoose.Schema.Types.ObjectId): Promise<User> {
    const user = await this.userModel
      .findById(id, {
        __v: false,
      })
      .exec()

    if (!user) {
      return null
    }

    return user.toObject()
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne(
        { email },
        {
          __v: false,
        },
      )
      .exec()

    if (!user) {
      return null
    }

    return user.toObject()
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user)

    return createdUser.save()
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec()
  }
}
