import { h, Ref } from 'vue'
import { BaseModel } from '@/hooks/useModel'
import { EFormInst, EFormProps, EModelCommProps, EModelState, EQueryProps, ETableInst, ETableProps, LoadData } from '@/components/ext/types'
import { DataTableInst, FormInst, NDatePicker, NInput, NSwitch, NTimePicker } from 'naive-ui'
import EDictInput from '@/components/ext/input/EDictInput.vue'
import type { EzModelOptions, FormType, IFormData } from 'easy-descriptor'
import { BaseModelConstructor, FormDataTypeEnum, FormTypeEnum, InputTypeEnum, useModelOptions } from 'easy-descriptor'
import { useModelApi } from '@/hooks/useApi'
import { EzFieldOption } from '@/hooks/useModel/types'
import { cloneDeep } from 'lodash-es'

export const initModel = <T extends BaseModel>(instance: BaseModelConstructor<T>, cProps?: EModelCommProps<T>): EModelState<T> => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ETableInst<T>>()
  const nTableRef = ref<DataTableInst>()
  const formRef = ref<EFormInst<T>>()
  const nFormRef = ref<FormInst>()
  const queryRef = ref<EFormInst<T>>()
  const nQueryRef = ref<FormInst>()

  const modelOptions: EzModelOptions<T> = useModelOptions<T>(instance)
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
    const resp = await loadPage(params).catch((err) => {
      return Promise.reject(err || new Error('数据加载失败'))
    })
    return resp.data
  }

  // const showForm = async (formData: any, type?: FormType) => {
  //   console.log('formData --> ', formData)
  //   const _formData = config?.formatFormData ? await config.formatFormData(formData) : formData
  //   formRef.value!.open(type!, _formData)
  //   return _formData
  // }

  const reload: LoadData<T> = async (params?: any) => {
    return await tableRef.value!.reload(params)
  }

  const tableProps: ETableProps<T> = {
    'onUpdate:bindRef': (val: DataTableInst) => {
      nTableRef.value = val
    },
    loadData,
    instance,
    formInst: formRef,
    modelOptions: cloneDeep(modelOptions),
    ...cProps?.tableProps
    // onShowForm: showForm
    // 'on-show-form': showFormAndFormat
  }

  const formProps: EFormProps<T> = {
    'onUpdate:bindRef': (val: FormInst) => {
      nFormRef.value = val
    },
    instance,
    modelOptions: cloneDeep(modelOptions),
    // formatFormData: config?.formatFormData as FormatFormData<T>,
    // beforeSubmit: config?.beforeSubmit as FormatFormData<T>,
    onSuccess: reload,
    ...cProps?.formProps
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
    modelOptions: cloneDeep(modelOptions),
    ...cProps?.queryProps
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
    commProps: {
      tableProps,
      formProps,
      queryProps
    },
    loadData
    // showForm
  }
}

export const createInputComponent = <T extends BaseModel>(field: EzFieldOption, formData: Ref<IFormData<T> | undefined>, formType?: FormType, props?: any) => {
  const { key, path, label, inputType, inputProps = {}, queryInputProps = {}, disabled, disabledHandler } = field
  const { formCompProps = {} } = field

  const query = formType === FormTypeEnum.SEARCH
  let component: any
  const dataKey = (path || key || '').toString() as keyof IFormData<T>
  if (!formData.value) {
    formData.value = {}
  }
  const fieldValue = formData.value[dataKey]
  // const refFormData = ref<IFormData<T>>(formData)
  const compProps: Record<string, any> = {
    placeholder: label,
    value: fieldValue === undefined ? null : fieldValue,
    'onUpdate:value': (val: any) => {
      formData.value![dataKey] = val
    },
    clearable: true,
    filterable: true,
    showButton: formType !== FormTypeEnum.EDIT_TABLE,
    ...inputProps,
    ...(query ? queryInputProps : {}),
    ...(props || {}),
    ...formCompProps
  }
  if (
    disabled === true ||
    (disabled && formType && disabled.includes(formType as any)) ||
    (disabledHandler && disabledHandler(formData.value as IFormData<T>, formType))
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
