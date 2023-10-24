import service from '@/utils/request'
import { LoginForm, User, Roles } from '@/pages/login/types/index'

type CaptchaImageType = {
	uuid: string
	img: string
}
type LoginResult = {
	token: string
}

// 获取验证码
export const getCaptchaImage = () => {
	return service.get<unknown, CaptchaImageType>('/captchaImage')
}

export const login = (data: LoginForm) => {
	return service.post<LoginForm, LoginResult>('/login', data)
}

export const getInfo = () => {
	return service.get<
		unknown,
		{ permissions: Permissions; roles: Roles; user: User }
	>('/getInfo')
}

export const getRouters = () => {
	return service.get('/getRouters')
}
