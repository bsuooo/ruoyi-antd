export type LoginForm = {
	username: string
	password: string
	uuid: string
	code: string
}
export type Permissions = string[]
export type Roles = string[]
export type DeptInfo = {
	deptName: string
	parentId: number
	deptId: number
}
export type User = {
	avatar: string
	deptId: number
	dept: DeptInfo
	nickName: string
	sex: string
	userId: number
	userName: string
}
export type RouteMeta = {
	icon?: string
	link?: string
	noCache: boolean
	title: string
}
export type Route = {
	alwaysShow?: boolean
	component: string
	hidden: boolean
	name: string
	path: string
	redirect?: string
	meta: RouteMeta
	children?: Route[]
}

export type GetInfoResult = {
	permissions: Permissions
	roles: Roles
	user: User
}

export type RequestResponse<T> = {
	code: number
	data: T
	msg: string
}

export type GetRoutersResult = RequestResponse<Route[]>
