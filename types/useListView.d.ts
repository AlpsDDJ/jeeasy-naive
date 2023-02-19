declare global {
  type ListView<T extends IBaseModel> = {
    records: T[]
    loading: boolean
    page: Page
  }

  type Page = {
    pageNo: number
    pageSize: number
    total: number
    pages: number
    orders?: Array<QueryOrder>
  }

  type OrderType = 'desc' | 'asc' | 'DESC' | 'ASC'

  type QueryOrder = string | { [key: string]: OrderType }
}

export default {}
