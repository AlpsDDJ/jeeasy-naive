import { Ref } from 'vue'
import { DataTableInst, DataTableProps, FormInst, FormItemProps, FormProps } from 'naive-ui'
import { ButtonActions } from '@/components/ActionButton/commonActions'
import { FormDataType, FormType, InputType } from '@/enums/EEnum'
import { BaseModel } from '@/hooks/useModel'

export type IFormType = EnumTypes<FormType>

export type IFormDataType = EnumTypes<FormDataType>
export type IInputType = EnumTypes<InputType>

export interface EFormItem<T extends BaseModel> extends FormItemProps, ModelStatePartialAttr<T, FieldOption<T>> {
  dataType?: IFormDataType
  inputType?: IInputType
}

export type IFormData<T extends BaseModel> = Record<string, unknown> & {
  [key in keyof T]?: T[key]
}

export interface EFormInst<T extends BaseModel> extends FormInst {
  open: (type: IFormType, fData?: IFormData<T>) => void
  close: () => Promise<void>
}

export interface ETableProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  showForm?: (type: IFormType, fData?: IFormData<T>) => void
  formInst?: EFormInst<T>
  queryData?: FormData<T>
  tableProps?: DataTableProps
  // actions?: ButtonActions
}

export interface EFormProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  defauleData?: IFormData<T>
  wSize?: number | string
  cols?: number
  formProps?: FormProps
  formatFormData?: (fData: IFormData<T>, type?: IFormType) => IFormData<T>
}

export interface EQueryInst<T extends BaseModel> extends FormInst {
  query: LoadData<T>
  reset: () => void
}

export interface EQueryProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  loadData: LoadData<T>
  defauleData?: FormData<T>
  autoQuery?: boolean
  resetAndQuery?: boolean
  formProps?: FormProps
}

export interface LoadData<T extends BaseModel> {
  (params?: any): Promise<PageData<T>>
}

export interface ETableInst<T extends BaseModel> extends DataTableInst {
  loadData: LoadData<T>
}

export type ETableSlots<T> = {
  [K in keyof T & string as `#${K}`]: (row: any, index: number) => void
  // [key in keyof T]: any
} & {
  loading: any
  empty: any
}

export interface TableScrollToOption {
  left?: number
  top?: number
  behavior?: ScrollBehavior
}

export interface ShowForm {
  (type: IFormType, formData?: any): void
}

export interface EModelState<T extends BaseModel> {
  tableRef: Ref<ETableInst<T> | undefined>
  formRef: Ref<EFormInst<T> | undefined>
  queryRef: Ref<EFormInst<T> | undefined>
  formData: Ref<IFormData<T>>
  queryData: Ref<FormData<T>>
  loadData: LoadData<T>
  showForm: ShowForm
}

export interface FormData<T extends BaseModel> extends IFormData<T> {}
