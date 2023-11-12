import { AxiosRequestConfig } from 'axios'

declare global {
  type DataKey = string | symbol
  type InternalRowData = Record<string, any | unknown>

  type R<T = any> = {
    code: number
    data: T
    success: boolean
    message?: string
    timestamp?: number
  }
  type PageData<T> = {
    records: T[]
    size: number
    current: number
    total: number
    pages: number
  }

  export type HttpRequest<T = any, P = any> = {
    (data?: P, config?: AxiosRequestConfig<P>): Promise<R<T>>
  }

  type EnumTypes<T extends string | number> = keyof { [k in T]: unknown }

  type BaseModelConstructor<T> = typeof BaseModel & { new (...args: any[]): T }
}

export default {}
