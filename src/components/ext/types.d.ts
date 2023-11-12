import { Ref } from 'vue'
import { DataTableInst, DataTableProps, FormInst, FormItemProps, FormProps } from 'naive-ui'
import { ButtonActions } from '@/components/ActionButton/commonActions'
import { FormDataType, FormType, InputType } from '@/enums/ExtEnum'
import { BaseModel } from '@/hooks/useModel'

export type IFormType = EnumTypes<FormType>

export type IFormDataType = EnumTypes<FormDataType>
export type IInputType = EnumTypes<InputType>

export interface ExtFormItem<T> extends FormItemProps, ModelStatePartialAttr<T, FieldOption<T>> {
  dataType?: IFormDataType
  inputType?: IInputType
}

export type IFormData<T extends BaseModel> = {
  [key in keyof T]?: T[key]
}

export interface ExtFormInst<T> extends FormInst {
  open: (type: IFormType, fData?: IFormData<T>) => void
  close: () => Promise<void>
}

export interface ExtTableProps<T extends BaseModel> extends /* @vue-ignore */ DataTableProps {
  instance: BaseModelConstructor<T>
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  showForm?: (type: IFormType, fData?: IFormData<T>) => void
  formInst?: ExtFormInst<T>
  queryData?: QueryData<T>
  // actions?: ButtonActions
}

export interface ExtFormProps<T extends BaseModel> extends /* @vue-ignore */ FormProps {
  instance: BaseModelConstructor<T>
  defauleData?: FormData<T>
  wSize?: number | string
  cols?: number
}

export interface ExtQueryInst<T> extends FormInst {
  query: LoadData<T>
  reset: () => void
}

export interface ExtQueryProps<T extends BaseModel> extends /* @vue-ignore */ ExtFormProps<T> {
  instance: BaseModelConstructor<T>
  loadData: LoadData<T>
  defauleData?: QueryData<T>
  autoQuery?: boolean
  resetAndQuery?: boolean
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

export interface ShowForm {
  (type: IFormType, formData?: any): void
}

export interface ExtView<T> {
  tableRef: Ref<ExtTableInst<T> | undefined>
  formRef: Ref<ExtFormInst<T> | undefined>
  queryRef: Ref<ExtFormInst<T> | undefined>
  formData: Ref<IFormData<T> | undefined>
  queryData: Ref<QueryData<T> | undefined>
  loadData: LoadData<T>
  showForm: ShowForm
}

export interface QueryData<T> extends IFormData<T> {
  [key as string]?: any
}
