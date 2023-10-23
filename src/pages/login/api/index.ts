import service from '@/utils/request'

type CaptchaImageType = {
	uuid: string
	img: string
}

// 获取验证码
export const getCaptchaImage = () => {
	return service.get<CaptchaImageType, CaptchaImageType>('/captchaImage')
}
