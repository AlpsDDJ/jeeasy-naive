import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { getToken } from '@/store/modules/user'

export const setupRequest = (http: AxiosInstance) => {
  http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      //给请求头设置token
      const token = getToken()
      if (token) {
        // config.headers!.Authorization = `baseUrl ${token}`
        config.headers.set('Authorization', token)
      }
      return config
    },
    (error: AxiosError) => {
      // ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
}
