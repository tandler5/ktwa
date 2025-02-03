export interface User {
  id: number
  firstName: string
  lastName: string
  avatar: string
  email: string
  address: string
  country: {
    name: string
    code: string
  }
  phone?: string
  password?: string
  role: string
}
