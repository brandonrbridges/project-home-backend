import mongoose from 'mongoose'

export class CreatePropertyDto {
  owner_id: mongoose.Schema.Types.ObjectId
  address: {
    line_1: string
    line_2: string
    city: string
    state: string
    country: string
    postal_code: string
  }
  type: string
  bedrooms: number
  bathrooms: number
  rent: {
    amount: number
    start_date: Date
    frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  }
  deposit: number
}
