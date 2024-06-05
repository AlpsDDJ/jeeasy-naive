import { h, Ref } from 'vue'
import { BaseModel } from '@/hooks/useModel'
import { EFormInst, EModelState, ETableInst } from '@/components/ext/types'
import { NDatePicker, NInput, NSwitch, NTimePicker } from 'naive-ui'
import EDictInput from '@/components/ext/input/EDictInput.vue'
import type { FieldOption, FormData, FormType } from 'easy-descriptor'
import { FormDataTypeEnum, FormTypeEnum, InputTypeEnum } from 'easy-descriptor'

export const initModel = <T extends BaseModel>(): EModelState<T> => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ETableInst<T>>()
  const formRef = ref<EFormInst<T>>()
  const queryRef = ref<EFormInst<T>>()
  // const formData = ref<IFormData<T>>()
  const formData = ref<FormData<T>>({})
  const queryData = ref<FormData<T>>({})

  const loadData = (params: any = {}) => {
    return tableRef.value!.loadData({ ...queryData.value, ...params })
  }

  const showForm = (type: FormType, formData?: any) => {
    formRef.value!.open(type, formData)
  }

  return {
    tableRef,
    formRef,
    queryRef,
    formData: formData as Ref<FormData<T>>,
    queryData,
    loadData,
    showForm
    // showForm
  }
}

export const createInputComponent = <T extends BaseModel>(field: FieldOption<T>, formData: Ref<FormData<T>>, formType?: FormType, props?: any) => {
  const { key, path, label, inputType, inputProps = {}, queryInputProps = {}, disabled, disabledHandler } = field
  const query = formType === FormTypeEnum.SEARCH
  let component: any
  const fieldValue = formData.value?.[path || key || '']
  const compProps: Record<string, any> = {
    placeholder: label,
    value: fieldValue === undefined ? null : fieldValue,
    'onUpdate:value': (val: any) => {
      formData.value[path || key || ''] = val
    },
    clearable: true,
    filterable: true,
    showButton: formType !== FormTypeEnum.EDIT_TABLE,
    ...inputProps,
    ...(query ? queryInputProps : {}),
    ...(props || {})
  }
  if (
    disabled === true ||
    (disabled && formType && disabled.includes(formType as any)) ||
    (disabledHandler && disabledHandler(formData.value as FormData<T>, formType))
  ) {
    compProps.disabled = true
  }

  const dict = field.dict
  if (!!dict) {
    component = EDictInput
    compProps.code = dict
    compProps.component = query && inputType === 'switch' ? 'select' : inputType
    compProps.clearable = true
    compProps.multiple = !query && field.dataType === FormDataTypeEnum.ARRAY
    formType === FormTypeEnum.EDIT_TABLE && (compProps.showButton = false)
  } else {
    switch (inputType) {
      case InputTypeEnum.INPUT_NUMBER:
        component = NInputNumber
        break
      case InputTypeEnum.TEXT_AREA:
        component = NInput
        compProps.type = 'textarea'
        break
      case InputTypeEnum.DATE:
        component = NDatePicker
        // console.log("compProps['value-format'] ----- ", compProps['value-format'])
        !compProps['value-format'] && (compProps['value-format'] = 'yyyy-MM-dd')
        compProps['formatted-value'] = compProps.value
        compProps['on-update:formatted-value'] = compProps['on-update:value']
        delete compProps.value
        delete compProps['on-update:value']
        break
      case InputTypeEnum.DATETIME:
        component = NDatePicker
        compProps.type = 'datetime'
        break
      case InputTypeEnum.TIME:
        component = NTimePicker
        break
      case InputTypeEnum.SWITCH:
        component = NSwitch
        break
      default:
        component = NInput
        break
    }
  }
  // console.log('compProps -->', compProps)
  return h(component, compProps)
}
