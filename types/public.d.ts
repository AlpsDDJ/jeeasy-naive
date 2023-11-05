import { AxiosRequestConfig } from 'axios'

declare global {
  type InternalRowData = Record<string, any | unknown>

  type R<T = any> = {
    code: number
    data: T
    success: boolean
    message?: string
    timestamp?: number
  }
  export type HttpRequest<T = any, P = any> = {
    (data?: P, config?: AxiosRequestConfig<P>): Promise<R<T>>
  }
  type EnumTypes<T extends string | number> = keyof { [k in T]: unknown }
}

export default {}
