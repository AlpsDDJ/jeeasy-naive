import { FormProps } from 'naive-ui'

export interface ExtFormProps extends /* @vue-ignore */ FormProps {
  // formDate?: T
  jsonScheme: ExtFormItem[]
  wSize?: number | string
  cols?: number
  // formType?: IFormType
}
