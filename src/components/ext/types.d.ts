import type { Ref } from 'vue'
import type { DataTableInst, DataTableProps, FormInst, FormProps, PaginationProps } from 'naive-ui'
import type { ButtonActions } from '@/components/ActionButton/commonActions'
import type { BaseModelConstructor, FormType, IFormData, EzModelOptions } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'
import { Raw } from 'vue'

// export type InitModelConfig<T extends BaseModel = BaseModel> = {
//   beforeQuery?: FormatFormData<T>
//   beforeSubmit?: FormatFormData<T>
//   formatFormData?: FormatFormData<T>
// }

export interface EFormInst<T extends BaseModel> {
  open: (type: FormType, fData?: IFormData<T>) => Promise<void>
  close: () => Promise<void>
  getFormData: () => IFormData<T>
  setFormData: (data: IFormData<T>) => void
}

interface BindRefProps<T> {
  'onUpdate:bindRef'?: (val: T) => void
}

interface ECommProps<T extends BaseModel> {
  modelOptions: EzModelOptions<T>
  instance: BaseModelConstructor<T>
}

interface FormatFormData<T extends BaseModel> {
  (formData: IFormData<T>, type?: FormType): Promise<IFormData<T>>
}

export interface EModelProps extends Partial<Omit<EModelState<T>, 'modelOptions' | 'loadData'>>, EModelCommProps<T> {}

export interface ETableProps<T extends BaseModel> extends ECommProps<T>, BindRefProps<DataTableInst> {
  loadData?: LoadData<T>
  data?: T[]
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  topActions?: ButtonActions | false
  // onShowForm?: (type: FormType, fData?: IFormData<T>) => void
  formInst?: Ref<EFormInst<T> | undefined>
  queryData?: IFormData<T>
  beforeQuery?: FormatFormData<T>
  tableProps?: DataTableProps
  showPage?: false
  enableEdit?: boolean
  // onShowForm?: FormatFormData<T>
  autoLoad?: boolean
  dateKey?: DataKey
  // actions?: ButtonActions
}

export interface EFormProps<T extends BaseModel> extends ECommProps<T>, BindRefProps<FormInst> {
  isModal?: boolean
  defauleData?: IFormData<T>
  wSize?: number | string
  cols?: number
  formProps?: FormProps
  formatFormData?: FormatFormData<T>
  beforeSubmit?: FormatFormData<T>
  onSuccess?: (resp?: any, formType?: FormType) => void
  title?: string
  okBtn?: string | false
  cancelBtn?: string | false
}
//
export interface EQueryInst<T extends BaseModel> {
  getFormData: () => IFormData<T>
  query: LoadData<T>
  reset: () => void
}
//
export interface EQueryProps<T extends BaseModel> extends ECommProps<T>, BindRefProps<FormInst> {
  loadData: LoadData<T>
  defaultData?: IFormData<T>
  resetAndQuery?: boolean
  formProps?: FormProps
}

export interface LoadData<T extends BaseModel> {
  (params?: any): Promise<PageData<T>>
}
//
// // export interface LoadTree<T extends BaseModel> {
// //   (params?: any): Promise<TreeData<T>>
// // }
//
export interface ETableInst<T extends BaseModel> {
  reload: LoadData<T>
  getPageParams: () => PaginationProps
  getCheckedRows: () => T[]
}

export type RecordType<T extends BaseModel> = Record<string, any> & {
  [K in keyof T]: T[K]
}

//
export type ETableSlots<T> = {
  [K in keyof T & string as `#${K}`]: (row: RecordType<T>, index: number) => void
  // [key in keyof T]: any
} & {
  loading: any
  empty: any
}
//
export interface TableScrollToOption {
  left?: number
  top?: number
  behavior?: ScrollBehavior
}
//
export interface ShowForm {
  (formData: any, type: FormType): void
}

export interface EModelCommProps<T extends BaseModel> {
  tableProps?: Partial<ETableProps<T>> & Record<string, any>
  formProps?: Partial<EFormProps<T>> & Record<string, any>
  queryProps?: Partial<EQueryProps<T>> & Record<string, any>
}
//
export interface EModelState<T extends BaseModel> {
  refs: {
    tableRef: Ref<ETableInst<T> | undefined>
    formRef: Ref<EFormInst<T> | undefined>
    queryRef: Ref<EFormInst<T> | undefined>
    nTableRef: Ref<DataTableInst | undefined>
    nQueryRef: Ref<FormInst | undefined>
    nFormRef: Ref<FormInst | undefined>
  }
  commProps: {
    tableProps: ETableProps<T>
    formProps: EFormProps<T>
    queryProps: EQueryProps<T>
  }
  modelOptions: Raw<EzModelOptions<T>>
  loadData: LoadData<T>
  // showForm: ShowForm
}
//
// export interface IFormData<T extends BaseModel> extends IFormData<T> {}
//
// export interface FormatFormData<T extends BaseModel> {
//   (fData: IFormData<T>, type?: IFormType): IFormData<T>
// }
//
// export interface FormatQueryData<T extends BaseModel> {
//   (fData: IFormData<T>): IFormData<T>
// }
//
// export interface InitModelOptions {
//   formatFormData?: FormatFormData
//   formatQueryData?: FormatQueryData
// }
