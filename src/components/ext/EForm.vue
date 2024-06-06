<template>
  <template v-if="isModal">
    <n-drawer v-model:show="showForm" :width="wSize" :mask-closable="!showConfirmBtn" @after-enter="() => (formLoading = false)">
      <n-drawer-content>
        <template #header> {{ formTypeTitleMap[formType || ''] || '' }} </template>
        <n-spin :show="formLoading">
          <slot name="top" />
          <div :style="{ minHeight: '500px' }">
            <div v-if="!formLoading">
              <n-form ref="formRef" v-bind="formProps" :model="formData" label-placement="left" :inline="cols !== 1" label-width="auto">
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
          <div class="e-form-bottom" justify="space-between" style="width: 100%" :wrap-item="false">
            <div class="e-form-bottom-left">
              <n-space>
                <n-button v-if="showConfirmBtn" type="primary" secondary :loading="formLoading" @click="submitHandle">保存</n-button>
                <n-button type="default" secondary @click="() => close()">关闭</n-button>
              </n-space>
            </div>
            <div class="e-form-bottom-right">
              <slot name="bottom" />
            </div>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </template>
  <template v-else>
    <slot name="top" />
    <n-form ref="formRef" v-bind="formProps" :model="formData" label-placement="left" :inline="cols !== 1" label-width="auto">
      <n-grid :cols="cols" :x-gap="12">
        <n-form-item-gi v-for="item in jsonScheme" :key="item.path || item.key" v-bind="createFormItemProps(item)">
          <component :is="createInpComp(item)" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <slot />
  </template>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { FormInst, FormItemGiProps } from 'naive-ui'
  import { createInputComponent } from './index'
  import { appSetting, formTypeTitleMap } from '@/config/app.config'
  import { cloneDeep, isArray } from 'lodash-es'
  import { useModelApi } from '@/hooks/useApi'
  import type { FieldOption, FormType, IFormData } from 'easy-descriptor'
  import { FormTypeEnum } from 'easy-descriptor'
  import type { EFormInst, EFormProps } from './types'

  defineOptions({
    name: 'EForm'
  })

  const formRef = ref<FormInst>()
  /**
   * 表单类型
   * @see FormType
   */
  const formType = ref<FormType>()

  const formData = ref<IFormData<T>>()

  const props = withDefaults(defineProps<EFormProps<T>>(), {
    isModal: true,
    formProps: () => ({
      size: appSetting.formSize
    }),
    formatFormData: async (data: IFormData<T>) => cloneDeep(data)
  })
  const modelState = props.modelOptions

  const { save, update } = useModelApi<T>(modelState.api)

  const jsonScheme = computed<FieldOption<T>[]>(() =>
    Object.values(modelState?.fields || []).filter(({ hidden, hiddenHandler }) => {
      const flag1 = !(hidden === true || (hidden && hidden?.includes('form')) || (formType?.value && hidden && hidden?.includes(formType as any)))
      const flag2 = !hiddenHandler || !hiddenHandler(formData.value as IFormData<T>, formType.value)
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
  const showConfirmBtn = computed<boolean>(() => formType.value !== FormTypeEnum.VIEW)

  /**
   * 表单显示状态
   */
  const showForm = defineModel<boolean>('showForm', { default: false })

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, formData.value as IFormData<T>, formType.value)
  }

  const createFormItemProps = (field: FieldOption<T>): FormItemGiProps => {
    const { key, path, rule, rulePath, required, formSpan, label } = field
    const _rule: any[] = []
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
  const open = (type: FormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    fData && (formData.value = cloneDeep(fData))
    formData.value = cloneDeep({
      ...(props.defauleData || {}),
      ...(fData || {})
    }) as IFormData<T>
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
    (e: 'success', resp?: R, formType?: FormType): void
    (e: 'error', error: unknown, resp?: R, formType?: FormType): void
  }>()

  const submitHandle = async () => {
    formLoading.value = true
    try {
      const formDataClone = await props.formatFormData(formData.value as IFormData<T>, formType.value)
      let resp: any
      try {
        switch (formType.value) {
          case FormTypeEnum.ADD:
            resp = await save(formDataClone)
            break
          case FormTypeEnum.EDIT:
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
    } catch (e) {
      close(true)
    }
    // if (formDataClone === false) return
  }

  defineExpose<EFormInst<T>>({
    open,
    close,
    getFormData: () => formData.value as IFormData<T>
  })

  defineSlots<{
    top?: (props?: {}) => any
    default?: (props?: {}) => any
    bottom?: (props?: {}) => any
  }>()
</script>

<style scoped lang="less">
  .e-form-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
  }
</style>
