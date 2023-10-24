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
