import { FormInst, FormItemProps, FormProps } from 'naive-ui'
import { BaseModel } from '@/hooks/useModel'
import { FormDataType, FormType, InputType } from '@/enums/ExtEnum'
// import { FormType } from '@/enums/ExtEnum'

declare global {
  type IFormType = EnumTypes<FormType>

  type IFormDataType = EnumTypes<FormDataType>
  type IInputType = EnumTypes<InputType>

  type ExtFormItem = FormItemProps & {
    dataType: IFormDataType
    inputType: IInputType
  }

  type IFormData<T extends BaseModel> = {
    [key in keyof T]?: T[key]
  }

  export interface ExtFormInst<T> extends FormInst {
    show: (type: IFormType, fData?: IFormData<T>) => void
    hide: () => Promise<void>
  }

  // type FormScheme<T extends BaseModel> = {
  //   [key in keyof T]: ExtFormItem
  // }

  type ExtFormProps<T> = FormProps & {
    formDate?: T
    jsonScheme?: ExtFormItem[]
    formType?: IFormType
  }
}

export {}
