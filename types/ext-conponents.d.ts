import { FormItemProps, FormProps } from 'naive-ui'
import { BaseModel } from '@/hooks/useModel'
// import { FormType } from '@/enums/ExtEnum'

declare global {
  export const enum FormType {
    ADD,
    EDIT,
    VIEW
  }

  enum FormDataType {
    STRING,
    NUMBER,
    BOOLEAN,
    DATE,
    TIME,
    DATETIME
  }

  type IFormType = EnumTypes<FormType>

  type IFormDataType = EnumTypes<FormDataType>
  type IInputType = 'input' | 'inputNumber' | 'date' | 'time' | 'datetime' | 'switch' | 'select' | 'treeSelect'
  type ICustomInputType = 'dict' | 'sysUserSelect'

  type ExtFormItem = FormItemProps & {
    dataType: IFormDataType
    inputType: IInputType | ICustomInputType
  }

  const formItem: ExtFormItem = {
    dataType: FormDataType.STRING
  }

  type FormScheme<T extends BaseModel> = {
    [key in keyof T]: ExtFormItem
  }

  type ExtFormProps<T> = FormProps & {
    // formDate?: T
    jsonScheme?: FormScheme<T>
    formType?: IFormType
  }
}

export {}
