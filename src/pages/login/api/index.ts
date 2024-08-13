import type {
  GetInfoResult,
  GetRoutersResult,
  LoginForm,
} from '@/pages/login/types/index'
import service from '@/utils/request'

interface CaptchaImageType {
  uuid: string
  img: string
}
interface LoginResult {
  token: string
}

// 获取验证码
export function getCaptchaImage() {
  return service.get<unknown, CaptchaImageType>('/captchaImage')
}

export function login(data: LoginForm) {
  return service.post<LoginForm, LoginResult>('/login', data)
}

export function getInfo() {
  return service.get<unknown, GetInfoResult>('/getInfo')
}

export function getRouters() {
  return service.get<unknown, GetRoutersResult>('/getRouters')
}
