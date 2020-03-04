export interface User {
  userId: number,
  username?: string,
  firstname?: string,
  lastname?: string
  email: string,
  roles?: string[]
  projects?: string[]
  isAdmin?: boolean
}
