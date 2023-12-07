import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { useUserStore } from '@/store/modules/user'

export const setupResponse = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response
      const { success, message } = data
      if (success) {
        return data
      } else {
        return Promise.reject(message)
      }
    },
    (error: AxiosError) => {
      let msg: string
      // HTTP 状态码
      const status = error.response?.status
      // @ts-ignore
      const message = error.response?.data?.message || ''
      switch (status) {
        case 401:
          msg = 'token失效，请重新登录'
          // 这里可以触发退出的 action
          console.log('请重新登录')
          useUserStore().doLogout(false)
          break
        case 403:
          msg = '没有权限,请获取权限后登录'
          break
        case 404:
          msg = '资源走丢了'
          break
        case 500:
          msg = '服务器故障'
          break
        case 502:
          msg = '数据库查询错误'
          break
        default:
          msg = '网络连接错误'
      }
      window.$message.error(message || msg || error.message)
      return Promise.reject(message ? new Error(message) : error)
    }
  )
}
