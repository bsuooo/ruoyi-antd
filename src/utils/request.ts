import axios from 'axios'
import { message } from 'ant-design-vue'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/system'
import { tansParams } from '@/utils/ruoyi/tansParams'
import errorCode from '@/utils/ruoyi/errorCode'

const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: 'https://vue.ruoyi.vip/prod-api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === true
    const isToken = true

    if (isToken) {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}` // token
      }
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code || 200
    const msg = errorCode[code] || response.data.msg || errorCode.default
    if (
      response.request.responseType === 'blob'
      || response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }
    if (code === 401) {
      message.error({ content: '登录状态已过期，请重新登录。', key: '_401Key' })
      return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
    }
    else if (code !== 200) {
      message.error(msg)
      return Promise.reject(new Error(msg))
    }
    else {
      return response.data
    }
  },
  (error) => {
    message.error('后端连接异常！')
    return Promise.reject(error)
  },
)

export default service
