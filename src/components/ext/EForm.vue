<template>
  <n-drawer v-model:show="showForm" :width="wSize" :mask-closable="!showConfirmBtn" @after-enter="() => (formLoading = false)">
    <n-drawer-content>
      <template #header> {{ formTypeTitleMap[formType || ''] || '' }} </template>
      <n-spin :show="formLoading">
        <div :style="{ minHeight: '500px' }">
          <div v-if="!formLoading">
            <n-form ref="formRef" v-bind="props.formProps" :model="formData" label-placement="left" :inline="cols !== 1" label-width="auto">
              <n-grid :cols="cols" :x-gap="12">
                <n-form-item-gi v-for="item in jsonScheme" :key="item.path || item.key" v-bind="createFormItemProps(item)">
                  <component :is="createInpComp(item)" />
                </n-form-item-gi>
              </n-grid>
            </n-form>
            <slot />
          </div>
        </div>
      </n-spin>
      <template #footer>
        <n-space>
          <n-button type="default" secondary @click="() => close()">关闭</n-button>
          <n-button v-if="showConfirmBtn" type="primary" secondary :loading="formLoading" @click="submitHandle">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { FormInst, FormItemGiProps } from 'naive-ui'
  import type { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import type { EFormInst, EFormProps, IFormData, IFormType } from './types'
  import { createInputComponent } from './index'
  import { appSetting, formTypeTitleMap } from '@/config/app.config'
  import { cloneDeep, isArray } from 'lodash-es'
  import { useModelApi } from '@/hooks/useApi'

  defineOptions({
    name: 'EForm'
  })

  const formRef = ref<FormInst>()
  /**
   * 表单类型
   * @see FormType
   */
  const formType = ref<IFormType>()

  const formData = defineModel<IFormData<T>>({
    local: true,
    default: {}
  })

  const props = withDefaults(defineProps<EFormProps<T>>(), {
    formProps: () => ({
      size: appSetting.formSize
    }),
    formatFormData: (data: IFormData<T>) => cloneDeep(data)
  })

  const modelState = ref<ModelState<T>>(useModel<T>(props.instance))
  const { save, update } = useModelApi<T>(modelState.value.api)

  const jsonScheme = computed<FieldOption<T>[]>(() =>
    Object.values(modelState.value?.fields || []).filter(({ hidden, hiddenHandler }) => {
      const flag1 = !(hidden === true || (hidden && hidden?.includes('form')) || (formType?.value && hidden && hidden?.includes(formType as any)))
      const flag2 = !hiddenHandler || !hiddenHandler(formData.value, formType.value)
      return flag1 && flag2
    })
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
    return createInputComponent<T>(field, formData, formType.value)
  }

  const createFormItemProps = (field: FieldOption<T>): FormItemGiProps => {
    const { key, path, rule, rulePath, required, formSpan, label } = field
    const _rule: EFormItemRule[] = []
    if (rule) {
      if (isArray(rule)) {
        _rule.push(...rule.filter(({ formTypes }) => !formTypes || formTypes.includes(formType.value as any)))
      } else if (!rule.formTypes || rule.formTypes.includes(formType.value as any)) {
        _rule.push(rule)
      }
    }
    const _key = (path || key).toString()
    return { path: _key, rule: _rule, rulePath, required, label, span: formSpan }
  }

  /**
   * 打开 抽屉
   * @param type
   * @param fData
   */
  const open = (type: IFormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    fData && (formData.value = cloneDeep(fData))
    formType.value = type
    showForm.value = true
    formLoading.value = true
  }

  /**
   * 关闭 抽屉
   */
  const close = (clearForm?: boolean) => {
    showForm.value = false
    formLoading.value = false
    clearForm && (formData.value = {})
    return Promise.resolve()
  }

  const emits = defineEmits<{
    (e: 'success', resp?: R, formType?: IFormType): void
    (e: 'error', error: unknown, resp?: R, formType?: IFormType): void
  }>()

  const submitHandle = async () => {
    formLoading.value = true
    const formDataClone = props.formatFormData(formData.value, formType.value)
    let resp: any
    try {
      switch (formType.value) {
        case FormType.ADD:
          resp = await save(formDataClone)
          break
        case FormType.EDIT:
          resp = await update(formDataClone)
          break
        default:
          close()
          break
      }
    } catch (error) {
      emits('error', error, resp, formType.value)
      window.$message.error(error ? (error as Error).message : typeof resp.data === 'string' ? resp.data : resp.message)
      formLoading.value = false
      return
    }
    emits('success', resp, formType.value)
    window.$message.success(typeof resp.data === 'string' ? resp.data : resp.message)
    close(true)
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
