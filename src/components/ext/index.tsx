import { h, Raw } from 'vue'
import { BaseModel } from '@/hooks/useModel'
import { EFormInst, EFormProps, EModelState, EQueryProps, ETableInst, ETableProps, FormatFormData, InitModelConfig, LoadData } from '@/components/ext/types'
import { DataTableInst, FormInst, NDatePicker, NInput, NSwitch, NTimePicker } from 'naive-ui'
import EDictInput from '@/components/ext/input/EDictInput.vue'
import type { EzModelOptions, FormType, IFormData } from 'easy-descriptor'
import { BaseModelConstructor, FormDataTypeEnum, FormTypeEnum, InputTypeEnum, useModelOptions } from 'easy-descriptor'
import { useModelApi } from '@/hooks/useApi'
import { EzFieldOption } from '@/hooks/useModel/types'

export const initModel = <T extends BaseModel>(instance: BaseModelConstructor<T>, config?: InitModelConfig): EModelState<T> => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ETableInst<T>>()
  const nTableRef = ref<DataTableInst>()
  const formRef = ref<EFormInst<T>>()
  const nFormRef = ref<FormInst>()
  const queryRef = ref<EFormInst<T>>()
  const nQueryRef = ref<FormInst>()

  const modelOptions: Raw<EzModelOptions<T>> = markRaw(useModelOptions<T>(instance))
  const { page: loadPage } = useModelApi<T>(modelOptions.api)

  const loadData: LoadData<T> = async (param?: any) => {
    // tableLoading.value = true
    const pagination = tableRef.value?.getPageParams() || {}
    const queryData = queryRef.value?.getFormData() || {}
    const { pageSize, page } = pagination
    const params = {
      size: pageSize,
      current: page,
      ...(queryData || {}),
      ...param
    }
    const resp = await loadPage(config?.beforeQuery ? await config?.beforeQuery(params) : params).catch((err) => {
      return Promise.reject(err || new Error('数据加载失败'))
    })
    return resp.data
  }

  const showForm = async (type: FormType, formData?: any) => {
    console.log('formData --> ', formData)
    formRef.value!.open(type, config?.beforeShowForm ? await config.beforeShowForm(formData) : formData)
  }

  const reload: LoadData<T> = async (params?: any) => {
    return await tableRef.value!.reload(params)
  }

  const tableProps: ETableProps<T> = {
    'onUpdate:bindRef': (val: DataTableInst) => {
      nTableRef.value = val
    },
    loadData,
    instance,
    modelOptions,
    onShowForm: showForm
    // 'on-show-form': showFormAndFormat
  }

  const formProps: EFormProps<T> = {
    'onUpdate:bindRef': (val: FormInst) => {
      nFormRef.value = val
    },
    instance,
    modelOptions,
    formatFormData: config?.beforeSubmit as FormatFormData<T>,
    onSuccess: reload
    // 'on-show-form': showFormAndFormat
  }
  const queryProps: EQueryProps<T> = {
    'onUpdate:bindRef': (val: FormInst) => {
      nFormRef.value = val
    },
    loadData: reload,
    formProps: {
      labelWidth: 80
    },
    instance,
    modelOptions
  }

  return {
    refs: {
      tableRef,
      nTableRef,
      formRef,
      nFormRef,
      queryRef,
      nQueryRef
    },
    modelOptions,
    props: {
      tableProps,
      formProps,
      queryProps
    },
    loadData,
    showForm
  }
}

export const createInputComponent = <T extends BaseModel>(field: EzFieldOption, formData: IFormData<T>, formType?: FormType, props?: any) => {
  const { key, path, label, inputType, inputProps = {}, queryInputProps = {}, disabled, disabledHandler } = field
  const query = formType === FormTypeEnum.SEARCH
  let component: any
  const dataKey: string = (path || key || '').toString()
  const fieldValue = formData?.[dataKey]
  const refFormData = ref<IFormData<T>>(formData)
  const compProps: Record<string, any> = {
    placeholder: label,
    value: fieldValue === undefined ? null : fieldValue,
    'onUpdate:value': (val: any) => {
      refFormData.value[dataKey] = val
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
    (disabledHandler && disabledHandler(refFormData.value as IFormData<T>, formType))
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
  return markRaw(h(component, compProps))
}
