import { FormProps } from 'naive-ui'
// import { FormType } from '@/enums/ExtEnum'

declare global {
  enum FormType {
    ADD,
    EDIT,
    VIEW
  }
  type IFormType = EnumTypes<FormType>

  type ExtFormProps<T> = FormProps & {
    formDate?: T
    formType?: IFormType
  }
}

export {}
