import { FormProps, DataTableProps, DataTableInst } from 'naive-ui'
import { ButtonActions } from '@/components/ActionButton/commonActions'
import { IFormData, IFormType } from '/#/ext-conponents'

export interface ExtFormProps extends /* @vue-ignore */ FormProps {
  // formDate?: T
  jsonScheme: ExtFormItem[]
  wSize?: number | string
  cols?: number
  // formType?: IFormType
}

export interface ExtTableProps<T> extends /* @vue-ignore */ DataTableProps {
  instance: BaseModelConstructor<T>
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  showForm?: (type: IFormType, fData?: IFormData<T>) => void
  formInst?: ExtFormInst<T>
  // actions?: ButtonActions
}

export interface LoadData<T> {
  (params?: any): Promise<PageData<T>>
}

export interface ExtTableInst<T> extends DataTableInst {
  loadData: LoadData<T>
}

export interface TableScrollToOption {
  left?: number
  top?: number
  behavior?: ScrollBehavior
}
