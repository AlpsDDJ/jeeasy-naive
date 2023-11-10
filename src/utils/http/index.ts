import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '@/utils/http/config'
import { setupRequest } from '@/utils/http/interceptors/request'
import { setupResponse } from '@/utils/http/interceptors/response'

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

setupRequest(http)
setupResponse(http)

export default http
type HttpRequestParam<T = any, P = any> = Parameters<HttpRequest<T, P>>

export function httpRequest<T = any, P = any>(...[data, config = {}]: HttpRequestParam<T, P>): ReturnType<HttpRequest<T, P>> {
  const method = config.method?.toUpperCase() || 'GET'
  config.method = method
  if (data) {
    config[['DELETE', 'GET'].some((key) => key === method) ? 'params' : 'data'] = data
    config.url &&
      (config.url = config.url.replace(/{\s*(.*?)\s*}/g, (context, objKey) => {
        const val = data[objKey]
        if (val === undefined) {
          throw new Error(`${config.url} 缺少参数: [${objKey}]`)
        }
        // 删除URL中匹配的参数
        delete data[objKey]
        return val
      }))
  }

  return http<P, R<T>>(config || {})
}

export const httpGet = <T = any, P = any>(url: string, params?: P): Promise<R<T>> => {
  return http.get<P, R<T>>(url, {
    params
  })
}

export const httpPost = <T = any, P = any>(url: string, data?: P): Promise<R<T>> => {
  return http.post<P, R<T>>(url, data)
}

export const httpPut = <T = any, P = any>(url: string, data?: P): Promise<R<T>> => {
  return http.put<P, R<T>>(url, data)
}

export const httpDelete = <T = any, P = any>(url: string, params?: P): Promise<R<T>> => {
  return http.delete<P, R<T>>(url, {
    params
  })
}
