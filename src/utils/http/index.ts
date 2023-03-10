import axios, { AxiosRequestConfig } from 'axios'
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

export const httpRequest = <T = any, P = any>(data?: P, option?: AxiosRequestConfig<P>): Promise<R<T>> => {
  return http<P, R<T>>(option || {})
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
