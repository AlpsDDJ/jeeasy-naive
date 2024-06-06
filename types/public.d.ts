import { HttpRequest } from 'easy-descriptor'

declare global {
  type DataKey = string | symbol

  type R<T = any> = {
    code: number
    data: T
    success: boolean
    message?: string
    timestamp?: number
  }

  type HttpReq<T, P = any> = HttpRequest<R<T>, P>

  type PageData<T> = {
    records: T[]
    size: number
    current: number
    total: number
    pages: number
  }

  export type DataIdParam = {
    id: string
  }
}

export default {}
