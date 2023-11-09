import { FormInst, FormItemProps } from 'naive-ui'
import { BaseModel } from '@/hooks/useModel'
import { FormDataType, FormType, InputType } from '@/enums/ExtEnum'
// import { FormType } from '@/enums/ExtEnum'

declare global {
  type IFormType = EnumTypes<FormType>

  type IFormDataType = EnumTypes<FormDataType>
  type IInputType = EnumTypes<InputType>

  interface ExtFormItem extends FormItemProps {
    dataType?: IFormDataType
    inputType?: IInputType
  }

  type IFormData<T extends BaseModel> = {
    [key in keyof T]?: T[key]
  }

  interface ExtFormInst<T> extends FormInst {
    show: (type: IFormType, fData?: IFormData<T>) => void
    hide: () => Promise<void>
  }

  // type FormScheme<T extends BaseModel> = {
  //   [key in keyof T]: ExtFormItem
  // }

  // interface ExtFormProps extends /* @vue-ignore */ FormProps {
  //   // formDate?: T
  //   jsonScheme: ExtFormItem[]
  //   wSize?: number | string
  //   // formType?: IFormType
  // }
}

export {}
