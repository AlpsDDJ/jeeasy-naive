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
  import type { EFormInst, EFormProps, IFormData, IFormType, FormData } from './types'
  import { createInputComponent } from './index'
  import { appSetting, formTypeTitleMap } from '@/config/app.config'
  import { cloneDeep } from 'lodash-es'

  defineOptions({
    name: 'EForm'
  })

  const formRef = ref<FormInst>()
  /**
   * 表单类型
   * @see FormType
   */
  const formType = ref<IFormType>()

  const formData = defineModel<FormData<T>>({
    local: true,
    default: {}
  })

  const props = withDefaults(defineProps<EFormProps<T>>(), {
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

  defineExpose<EFormInst<T>>({
    open,
    close,
    ...expose
  })
</script>

<style scoped lang="less"></style>
