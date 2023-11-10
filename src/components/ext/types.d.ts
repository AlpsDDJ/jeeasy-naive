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

export interface ExtFormProps<T extends BaseModel> extends /* @vue-ignore */ FormProps {
  instance: BaseModelConstructor<T>
  // formDate?: T
  // jsonScheme: ExtFormItem[]
  wSize?: number | string
  cols?: number
  // formType?: IFormType
}

export interface ExtTableProps<T extends BaseModel> extends /* @vue-ignore */ DataTableProps {
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

export interface ShowForm {
  (type: IFormType, formData?: any): void
}

export interface ExtView<T> {
  tableRef: Ref<ExtTableInst<T> | undefined>
  formRef: Ref<ExtFormInst<T> | undefined>
  formData: Ref<IFormData<T> | undefined>
  loadData: LoadData<T>
  showForm: ShowForm
}
