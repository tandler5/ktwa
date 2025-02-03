import type {User} from '../User'

export interface LoginForm {
  email: string
  password: string
}

export interface LoginData {
  user: User
  token: string
}
