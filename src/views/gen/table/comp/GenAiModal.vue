<script setup lang="ts">
  import { initModel } from '@/components/ext'
  import { GenAiForm } from '@/views/gen/table/model'
  import { IFormData } from 'easy-descriptor'
  import { AiChatApi } from '@/api/aiChat'

  // const modalShow = ref<boolean>()
  const { refs, commProps } = initModel(GenAiForm)
  const { formRef } = refs
  const { formProps } = commProps

  const show = (tableName?: string) => {
    console.log('show')
    formRef.value?.open('add', {
      tableName
    })
    // modalShow.value = true
    // tableName &&
    //   formRef.value?.setFormData({
    //     tableName
    //   })
  }

  const handleSubmit = async (formData: IFormData<GenAiForm>) => {
    console.log('handleSubmit: ', formData)
    await AiChatApi.sse({
      content: formData.tableDesc,
      params: {
        tableName: formData.tableName,
        dbType: 'MySql'
      }
    })
    return Promise.reject()
  }

  const close = () => {
    formRef.value?.close()
  }

  defineExpose<{
    show: (tableName?: string) => void
    close: () => void
  }>({
    show,
    close
  })
</script>

<template>
  <e-form ref="formRef" v-bind="formProps" :cols="3" :before-submit="handleSubmit" />
</template>

<style scoped></style>
