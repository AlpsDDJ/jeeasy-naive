declare global {
  type InternalRowData = Record<string, any | unknown>

  type R<T = any> = {
    code: number
    data: T
    success: boolean
    message?: string
    timestamp?: number
  }
}

export default {}
