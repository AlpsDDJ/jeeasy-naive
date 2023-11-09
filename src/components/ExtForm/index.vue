<template>
  <n-drawer v-model:show="showForm" :width="300">
    <n-form ref="formRef" :model="formData">
      <n-form-item-row>
        <n-form-item-gi v-for="item in jsonScheme" :key="item.path">
          <n-input v-model:value="formData[item.path || '']" />
        </n-form-item-gi>
      </n-form-item-row>
    </n-form>
  </n-drawer>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { FormInst } from 'naive-ui'
  import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'

  defineOptions({
    name: 'ExtForm',
    inheritAttrs: true
  })
  const formRef = ref<FormInst>()
  const formType = ref<IFormType>()

  const formData = defineModel<IFormData<T>>({ local: true, default: {} })

  // const formData = ref<T>({})
  const showForm = defineModel<boolean>('show', { local: true, default: false })

  // const data: IFormData<User> = {
  //   realName: '123'
  // }

  const show = (type: IFormType, fData?: IFormData<T>) => {
    console.debug(`form show: type = ${type}, data = `, fData || {})
    fData && (formData.value = fData)
    formType.value = type
    showForm.value = true
  }

  const hide = () => {
    showForm.value = false
    return Promise.resolve()
  }

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
    // restoreValidation: formRef.value!.restoreValidation,
    // validate: formRef.value!.validate
  })

  // const defaultData: IFormData<T> = {}

  const jsonScheme = ref<ExtFormItem[]>([])
</script>

<style scoped lang="less"></style>
