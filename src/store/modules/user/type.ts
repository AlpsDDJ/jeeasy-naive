export type LoginForm = {
  username: string
  password: string
}

export type LoginUser = {
  username: string
}

export type UserState = {
  token?: string | null
  user?: LoginUser
  roles?: string[]
  permissions?: string[]
}
