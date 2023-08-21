// Nest
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Mongoose
import { Model } from 'mongoose'

// Schema
import { Invitation } from './invitation.schema'

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<Invitation>,
  ) {}

  async findAll(): Promise<Invitation[]> {
    const data = await this.invitationModel
      .find(null, {
        __v: false,
      })
      .exec()

    const array = data.map((item) => item.toObject())

    return array
  }

  async findOne(query: any): Promise<Invitation> {
    const data = await this.invitationModel.findOne(query).exec()

    if (!data) {
      return null
    }

    return data.toObject()
  }

  async findById(id: string): Promise<Invitation> {
    const data = await this.invitationModel.findById(id).exec()

    if (!data) {
      return null
    }

    return data.toObject()
  }

  async create(invitation: Invitation): Promise<Invitation> {
    const createdInvitation = new this.invitationModel(invitation)

    return createdInvitation.save()
  }
}
