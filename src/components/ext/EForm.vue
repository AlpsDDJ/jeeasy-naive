<template>
  <template v-if="isModal">
    <n-drawer v-model:show="showForm" :width="wSize" :mask-closable="!showConfirmBtn" @after-enter="() => (formLoading = false)">
      <n-drawer-content>
        <template #header> {{ title || formTypeTitleMap[formType || ''] || '' }} </template>
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
                <n-button v-if="showConfirmBtn" type="primary" secondary :loading="formLoading" @click="submitHandle">{{ okBtn }}</n-button>
                <n-button type="default" secondary @click="() => close()">{{ cancelBtn }}</n-button>
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
  import type { EFormInst, EFormProps, LoadData } from './types'

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
    formatFormData: async (data: IFormData<T>) => cloneDeep(data),
    beforeSubmit: async (data: IFormData<T>) => cloneDeep(data),
    okBtn: '保存',
    cancelBtn: '关闭'
  })
  const modelState = props.modelOptions

  const jsonScheme = computed<FieldOption<T>[]>(() =>
    Object.values(modelState?.fields || []).filter(({ hidden, hiddenHandler, key }) => {
      const flag1 = !(hidden === true || (hidden && hidden?.includes('form')) || (formType?.value && hidden && hidden?.includes(formType as any)))
      const flag2 = !hiddenHandler || !hiddenHandler(formData.value as IFormData<T>, formType.value)
      return flag1 && flag2 && !(key as string).startsWith('$')
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
  const showConfirmBtn = computed<boolean>(() => formType.value !== FormTypeEnum.VIEW && !!props.okBtn)

  /**
   * 表单显示状态
   */
  const showForm = defineModel<boolean>('showForm', { default: false })

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, formData, formType.value)
  }

  /**
   * 根据字段选项创建表单项的属性对象。
   *
   * 该函数用于根据提供的字段选项（FieldOption）生成表单项（FormItem）所需的属性（FormItemGiProps）。
   * 这些属性包括表单项的路径、验证规则、是否必填、标签等信息，用于在表单中正确渲染和验证表单项。
   *
   * @param field 字段选项对象，包含表单项的各种配置信息，如键名、路径、验证规则等。
   * @returns 返回一个对象，包含表单项在表单中的各种属性，如路径、验证规则、是否必填、标签和占据的栅格数。
   */
  const createFormItemProps = (field: FieldOption<T>): FormItemGiProps => {
    // 解构字段选项中的关键属性
    const { key, path, rule, rulePath, required, formSpan, label, formItemProps } = field
    // 初始化规则数组
    const _rule: any[] = []
    // 根据规则的类型和适用的表单类型，过滤并构建有效的验证规则数组
    if (rule) {
      if (isArray(rule)) {
        _rule.push(...rule.filter(({ formTypes }) => !formTypes || formTypes.includes(formType.value as any)))
      } else if (!rule.formTypes || rule.formTypes.includes(formType.value as any)) {
        _rule.push(rule)
      }
    }
    // 生成并转换表单项的路径或键名，确保其为字符串类型
    const _key = (path || key).toString()
    // 返回表单项的属性对象
    return { path: _key, rule: _rule, rulePath, required, label, span: formSpan, ...formItemProps }
  }

  /**
   * 打开 抽屉
   * @param type
   * @param fData
   */
  const open = async (type: FormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    // fData && (formData.value = await props.formatFormData(fData, type))
    formData.value = {
      ...cloneDeep(props.defauleData),
      ...(fData ? await props.formatFormData(fData, type) : {})
    } as IFormData<T>
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

  const { save, update } = useModelApi<T>(modelState.api)
  const submitHandle = async () => {
    formLoading.value = true
    try {
      const formDataClone = await props.beforeSubmit(formData.value || {}, formType.value)
      if (!formDataClone) {
        formLoading.value = false
        return
      }
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
    getFormData: () => formData.value as IFormData<T>,
    setFormData: (data: IFormData<T>) => {
      formData.value = { ...formData.value, ...data }
    }
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
