export class CreateUserDto {
  email: string
  password: string
  name: {
    first: string
    last: string
  }
  role: string
  phone: string
}
