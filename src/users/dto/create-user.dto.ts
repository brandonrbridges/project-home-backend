export class CreateUserDto {
  email: string
  password: string
  name: {
    first: string
    last: string
  }
  phone: string
  roles: string[]
}
