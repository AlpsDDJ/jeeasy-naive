import { Ref } from 'vue'
import { DataTableInst, DataTableProps, FormInst, FormProps } from 'naive-ui'
import { ButtonActions } from '@/components/ActionButton/commonActions'
// import { FormDataType, FormType, InputType } from '@/enums/EEnum'
import { BaseModelConstructor, FormType } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

// export type IFormType = EnumTypes<FormType>
// export type IFormDataType = EnumTypes<FormDataType>
// export type IInputType = EnumTypes<InputType>

// export interface EFormItem<T extends BaseModel> extends FormItemProps, ModelStatePartialAttr<T, FieldOption<T>> {
//   dataType?: IFormDataType
//   inputType?: IInputType
// }

// export type IFormData<T extends BaseModel> = Record<string, unknown> & {
//   [key in keyof T]?: T[key]
// }

export interface EFormInst<T extends BaseModel> extends FormInst {
  open: (type: FormType, fData?: IFormData<T>) => void
  close: () => Promise<void>
}

export interface ETableProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  data?: T[]
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  onShowForm?: (type: FormType, fData?: IFormData<T>) => void
  formInst?: EFormInst<T>
  queryData?: IFormData<T>
  beforeQuery?: (queryData: IFormData<T>) => IFormData<T>
  tableProps?: DataTableProps
  showPage?: boolean
  enableEdit?: boolean
  // actions?: ButtonActions
}

export interface EFormProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  isModal?: boolean
  defauleData?: IFormData<T>
  wSize?: number | string
  cols?: number
  formProps?: FormProps
  formatFormData?: (fData: IFormData<T>, type?: FormType) => Promise<IFormData<T>>
}
//
export interface EQueryInst<T extends BaseModel> extends FormInst {
  query: LoadData<T>
  reset: () => void
}
//
export interface EQueryProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  loadData: LoadData<T>
  defauleData?: IFormData<T>
  autoQuery?: boolean
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
export interface ETableInst<T extends BaseModel> extends DataTableInst {
  loadData: LoadData<T>
}
//
export type ETableSlots<T> = {
  [K in keyof T & string as `#${K}`]: (row: any, index: number) => void
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
  (type: FormType, formData?: any): void
}
//
export interface EModelState<T extends BaseModel> {
  tableRef: Ref<ETableInst<T> | undefined>
  formRef: Ref<EFormInst<T> | undefined>
  queryRef: Ref<EFormInst<T> | undefined>
  formData: Ref<IFormData<T>>
  queryData: Ref<IFormData<T>>
  loadData: LoadData<T>
  showForm: ShowForm
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
