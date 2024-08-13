export interface LoginForm {
  username: string
  password: string
  uuid: string
  code: string
}
export type Permissions = string[]
export type Roles = string[]
export interface DeptInfo {
  deptName: string
  parentId: number
  deptId: number
}
export interface User {
  avatar: string
  deptId: number
  dept: DeptInfo
  nickName: string
  sex: string
  userId: number
  userName: string
}
export interface RouteMeta {
  icon?: string
  link?: string
  noCache: boolean
  title: string
}
export interface Route {
  alwaysShow?: boolean
  component: string
  hidden: boolean
  name: string
  path: string
  redirect?: string
  meta: RouteMeta
  children?: Route[]
}

export interface GetInfoResult {
  permissions: Permissions
  roles: Roles
  user: User
}

export interface RequestResponse<T> {
  code: number
  data: T
  msg: string
}

export type GetRoutersResult = RequestResponse<Route[]>
