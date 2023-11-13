<template>
  <n-drawer v-model:show="showForm" :width="wSize" :mask-closable="!showConfirmBtn" @after-enter="afterEnterHandle" @after-leave="afterLeaveHandle">
    <n-drawer-content>
      <template #header> {{ formTypeTitleMap[formType || ''] || '' }} </template>
      <n-spin :show="formLoading">
        <n-form ref="formRef" v-bind="props.formProps" :model="formData" label-placement="left" :inline="cols !== 1" label-width="auto">
          <n-grid v-if="formActive" :cols="cols" :x-gap="12">
            <n-form-item-gi v-for="item in jsonScheme" :key="item.path || item.key" :label="item.label">
              <!--<n-input v-model:value="formData[item.path || item.key || '']" type="text" :placeholder="item.label" />-->
              <component :is="createInpComp(item)" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-spin>
      <template #footer>
        <n-space>
          <n-button type="default" secondary @click="close">关闭</n-button>
          <n-button v-if="showConfirmBtn" type="primary" secondary :loading="formLoading" @click="submitHandle">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { FormInst } from 'naive-ui'
  import type { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import type { ExtFormInst, ExtFormProps, IFormData, IFormType } from './types'
  import { createInputComponent } from './index'
  import { appSetting, formTypeTitleMap } from '@/config/app.config'
  import { cloneDeep } from 'lodash-es'

  defineOptions({
    name: 'ExtForm'
  })

  const formRef = ref<FormInst>()
  /**
   * 表单类型
   * @see FormType
   */
  const formType = ref<IFormType>()

  const formData = defineModel<IFormData<T>>({ local: true, default: () => {} })

  const props = withDefaults(defineProps<ExtFormProps<T>>(), {
    formProps: () => ({
      size: appSetting.formSize
    })
  })

  const modelState = ref<ModelState<T>>(useModel<T>(props.instance))
  const jsonScheme = computed<FieldOption<T>[]>(() =>
    Object.values(modelState.value?.fields || []).filter(
      ({ hidden }) => !(hidden === true || hidden?.includes('form') || (formType?.value && hidden?.includes(formType?.value)))
    )
  )
  /**
   * 表单列数
   */
  const cols = computed<number>(() => {
    const _cols = props.cols ? props.cols : Math.ceil(jsonScheme.value.length / appSetting.formMaxRows)
    const formMaxCols = appSetting.formMaxCols
    return _cols > formMaxCols ? formMaxCols : _cols
  })

  /**
   * 表单开窗大小
   */
  const wSize = computed<number | string>(() => (!props.wSize ? cols.value * appSetting.formColWidth : props.wSize))

  /**
   * 表单是否激活
   * 用于延迟动态渲染表单项，减少打开抽屉时卡顿
   */
  const formActive = ref<boolean>(false)

  /**
   * 表单加载中状态标记
   * 1.打开抽屉 --> 动态创建表单项完成
   * 2.提交表单 --> 提交完成
   */
  const formLoading = ref<boolean>(true)

  /**
   * 是否展示确认按钮：查看表单不展示
   */
  const showConfirmBtn = computed<boolean>(() => formType.value !== FormType.VIEW)

  /**
   * 表单显示状态
   */
  const showForm = defineModel<boolean>('showForm', { local: true, default: false })

  // const getInputComponent = computed(() => {
  //   return (field: FieldOption<T>) => {
  //     const { key, path, label, inputType, inputProps = {} } = field
  //     // console.log('inputProps ---> ', inputProps)
  //     let component: any
  //     const compProps: Record<string, any> = {
  //       placeholder: label,
  //       value: formData.value[path || key || ''],
  //       'on-update:value': (val: any) => {
  //         formData.value[path || key || ''] = val
  //       },
  //       ...inputProps
  //     }
  //     switch (inputType) {
  //       case InputType.INPUT_NUMBER:
  //         component = NInputNumber
  //         break
  //       case InputType.DATE:
  //         component = NDatePicker
  //         // console.log("compProps['value-format'] ----- ", compProps['value-format'])
  //         !compProps['value-format'] && (compProps['value-format'] = 'yyyy-MM-dd')
  //         compProps['formatted-value'] = compProps.value
  //         compProps['on-update:formatted-value'] = compProps['on-update:value']
  //         delete compProps.value
  //         delete compProps['on-update:value']
  //         break
  //       case InputType.DATETIME:
  //         component = NDatePicker
  //         compProps.type = 'datetime'
  //         break
  //       case InputType.TIME:
  //         component = NTimePicker
  //         break
  //       case InputType.SWITCH:
  //         component = NSwitch
  //         break
  //       default:
  //         component = NInput
  //         break
  //     }
  //     return h(component, compProps)
  //   }
  // })

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, formData)
  }
  /**
   * 抽屉 出现后的回调
   */
  const afterEnterHandle = () => {
    formActive.value = true
    formLoading.value = false
  }

  /**
   * 	抽屉 关闭后的回调
   */
  const afterLeaveHandle = () => {
    formActive.value = false
  }

  /**
   * 打开 抽屉
   * @param type
   * @param fData
   */
  const open = (type: IFormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    // fData && (formData.value = fData)
    fData && (formData.value = cloneDeep(fData))
    formType.value = type
    showForm.value = true
    formLoading.value = true
  }

  /**
   * 关闭 抽屉
   */
  const close = () => {
    showForm.value = false
    return Promise.resolve()
  }

  const submitHandle = () => {
    console.log('formData ---> ', formData.value)
  }

  /**
   * 对外暴漏表单方法
   */
  const expose = {
    restoreValidation: () => {
      formRef.value!.restoreValidation()
    },
    validate: (callback?: FormValidateCallback, shouldRuleBeApplied?: ShouldRuleBeApplied) => {
      return formRef.value!.validate(callback, shouldRuleBeApplied)
    }
  }

  defineExpose<ExtFormInst<T>>({
    open,
    close,
    ...expose
  })
</script>

<style scoped lang="less"></style>
