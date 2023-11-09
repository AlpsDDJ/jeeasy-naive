<template>
  <n-drawer
    v-model:show="showForm"
    :width="props.wSize ? props.wSize : (props.cols ? props.cols : 1) * appSetting.formColWidth"
    :mask-closable="!showConfirmBtn"
    @after-enter="afterEnterHandle"
    @after-leave="afterLeaveHandle"
  >
    <n-drawer-content>
      <template #header> {{ formTypeTitleMap[formType || ''] || '' }} </template>
      <n-spin :show="formLoading">
        <n-form ref="formRef" :model="formData" label-placement="left" :inline="cols !== 1" label-width="auto">
          <n-grid :cols="props.cols ? props.cols : 1">
            <n-form-item-gi v-for="item in formActive ? props.jsonScheme : []" :key="item.path" :label="item.label">
              <n-input v-model:value="formData[item.path || '']" :placeholder="item.label" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-spin>
      <template #footer>
        <n-space>
          <n-button type="default" secondary @click="hide">关闭</n-button>
          <n-button v-if="showConfirmBtn" type="primary" secondary :loading="formLoading">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { FormInst } from 'naive-ui'
  import type { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import type { ExtFormProps } from './types'
  import { appSetting, formTypeTitleMap } from '@/config/app.config'

  defineOptions({
    name: 'ExtForm',
    inheritAttrs: true
  })

  const props = withDefaults(defineProps<ExtFormProps>(), {
    size: appSetting.formSize
  })

  const formRef = ref<FormInst>()
  /**
   * 表单类型
   * @see FormType
   */
  const formType = ref<IFormType>()

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

  const formData = defineModel<IFormData<T>>({ local: true, default: {} })

  /**
   * 扁担显示状态
   */
  const showForm = defineModel<boolean>('showForm', { local: true, default: false })

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
  const show = (type: IFormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    // fData && (formData.value = fData)
    formType.value = type
    showForm.value = true
    formLoading.value = true
  }

  /**
   * 关闭 抽屉
   */
  const hide = () => {
    showForm.value = false
    return Promise.resolve()
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
    show,
    hide,
    ...expose
  })
</script>

<style scoped lang="less"></style>
