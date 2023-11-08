<template>
  <n-form v-bind="props"> </n-form>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { formProps } from 'naive-ui'
  import { BaseModel } from '@/hooks/useModel'

  defineOptions({
    name: 'ExtForm',
    inheritAttrs: true
  })

  // const formData = defineModel<T>()

  const props = defineProps({
    ...formProps
  })
</script>

<style scoped></style>
