import { Ref } from 'vue'
import { DataTableInst, DataTableProps, FormInst, FormItemProps, FormProps } from 'naive-ui'
import { ButtonActions } from '@/components/ActionButton/commonActions'
import { FormDataType, FormType, InputType } from '@/enums/EEnum'
import { BaseModel } from '@/hooks/useModel'

export type IFormType = EnumTypes<FormType>

export type IFormDataType = EnumTypes<FormDataType>
export type IInputType = EnumTypes<InputType>

export interface EFormItem<T> extends FormItemProps, ModelStatePartialAttr<T, FieldOption<T>> {
  dataType?: IFormDataType
  inputType?: IInputType
}

export type IFormData<T extends BaseModel> = {
  [key in keyof T]?: T[key]
}

export interface EFormInst<T> extends FormInst {
  open: (type: IFormType, fData?: IFormData<T>) => void
  close: () => Promise<void>
}

export interface ETableProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  // modelState: ModelState<T>
  actions?: ButtonActions | false
  showForm?: (type: IFormType, fData?: IFormData<T>) => void
  formInst?: EFormInst<T>
  queryData?: QueryData<T>
  tableProps?: DataTableProps
  // actions?: ButtonActions
}

export interface EFormProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  defauleData?: FormData<T>
  wSize?: number | string
  cols?: number
  formProps?: FormProps
}

export interface EQueryInst<T> extends FormInst {
  query: LoadData<T>
  reset: () => void
}

export interface EQueryProps<T extends BaseModel> {
  instance: BaseModelConstructor<T>
  loadData: LoadData<T>
  defauleData?: QueryData<T>
  autoQuery?: boolean
  resetAndQuery?: boolean
  formProps?: FormProps
}

export interface EModelProps<T extends BaseModel> {
  instance?: BaseModelConstructor<T>
}

export interface LoadData<T> {
  (params?: any): Promise<PageData<T>>
}

export interface ETableInst<T> extends DataTableInst {
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

export interface EModelState<T> {
  tableRef: Ref<ETableInst<T> | undefined>
  formRef: Ref<EFormInst<T> | undefined>
  queryRef: Ref<EFormInst<T> | undefined>
  formData: Ref<IFormData<T> | undefined>
  queryData: Ref<QueryData<T> | undefined>
  loadData: LoadData<T>
  showForm: ShowForm
}

export interface QueryData<T> extends IFormData<T> {
  [key as string]?: any
}
