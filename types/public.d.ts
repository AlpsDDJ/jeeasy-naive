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

  export type DataIdParam = {
    id: string
  }
}

export default {}
