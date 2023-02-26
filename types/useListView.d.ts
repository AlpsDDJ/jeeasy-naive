import { PaginationProps } from 'naive-ui'

declare global {
  type ListView<T extends IBaseModel> = {
    records: T[]
    loading: boolean
    pagination: PaginationProps
    onUpdatePagination: (page: PaginationProps) => void
  }

  // type Page = {
  //   pageNo: number
  //   pageSize: number
  //   total: number
  //   pages: number
  //   orders?: Array<QueryOrder>
  // }

  type OrderType = 'desc' | 'asc' | 'DESC' | 'ASC'

  type QueryOrder = string | { [key: string]: OrderType }
}

export default {}
