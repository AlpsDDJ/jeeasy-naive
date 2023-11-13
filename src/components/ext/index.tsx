import { h, Ref } from 'vue'
import { BaseModel } from '@/hooks/useModel'
import { EFormInst, ETableInst, EModelState, IFormData, IFormType, QueryData } from '@/components/ext/types'
import { InputType } from '@/enums/EEnum'
import { NDatePicker, NInput, NSwitch, NTimePicker } from 'naive-ui'

export const createEModel = <T extends BaseModel>(): EModelState<T> => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ETableInst<T>>()
  const formRef = ref<EFormInst<T>>()
  const queryRef = ref<EFormInst<T>>()
  const formData = ref<IFormData<T>>()
  const queryData = ref<QueryData<T>>({})

  const loadData = (params: any = {}) => {
    console.log('queryData.value --> ', queryData.value)
    return tableRef.value!.loadData({ ...queryData.value, ...params })
  }

  const showForm = (type: IFormType, formData?: any) => {
    formRef.value!.open(type, formData)
  }

  return {
    tableRef,
    formRef,
    queryRef,
    formData,
    queryData,
    loadData,
    showForm
    // showForm
  }
}

export const createInputComponent = <T extends BaseModel>(field: FieldOption<T>, formData: Ref<QueryData<T>>, query: boolean = false) => {
  const { key, path, label, inputType, inputProps = {}, queryInputProps = {} } = field
  // console.log('inputProps ---> ', inputProps)
  let component: any
  // const formData = defineModel<IFormData<T>>({ local: true, default: {} })
  const fieldValue = formData.value?.[path || key || '']
  const compProps: Record<string, any> = {
    placeholder: label,
    value: fieldValue === undefined ? null : fieldValue,
    'on-update:value': (val: any) => {
      formData.value[path || key || ''] = val
    },
    ...inputProps,
    ...(query ? queryInputProps : {})
  }
  switch (inputType) {
    case InputType.INPUT_NUMBER:
      component = NInputNumber
      break
    case InputType.DATE:
      component = NDatePicker
      // console.log("compProps['value-format'] ----- ", compProps['value-format'])
      !compProps['value-format'] && (compProps['value-format'] = 'yyyy-MM-dd')
      compProps['formatted-value'] = compProps.value
      compProps['on-update:formatted-value'] = compProps['on-update:value']
      delete compProps.value
      delete compProps['on-update:value']
      break
    case InputType.DATETIME:
      component = NDatePicker
      compProps.type = 'datetime'
      break
    case InputType.TIME:
      component = NTimePicker
      break
    case InputType.SWITCH:
      component = NSwitch
      break
    default:
      component = NInput
      break
  }
  return h(component, compProps)
}
