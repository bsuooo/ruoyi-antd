import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/system'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 60000,
	headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getToken()
		if (token) {
			config.headers.Authorization = 'Bear' + token
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		const { code, msg } = response.data
		if (code === 200) {
			return response.data
		}
		return Promise.reject(msg)
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default service
