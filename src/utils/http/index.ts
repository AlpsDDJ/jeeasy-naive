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

export const httpGet = <T = any, P = any>(url: string, params?: P): Promise<R<T>> => {
  return http.get<any, R<T>>(url, {
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
