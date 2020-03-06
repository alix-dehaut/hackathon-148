export interface User {
  projectUsers?: any[];
  id?: number,
  username?: string,
  firstname?: string,
  lastname?: string
  email: string,
  roles?: string[]
  plainPassword?: string
  projects?: string[]
  isAdmin?: boolean
}
