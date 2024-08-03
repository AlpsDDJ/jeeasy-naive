<template>
  <e-model v-bind="opts">
    <template ##enableFlag="row">
      <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'GenTemplateList'
  })

  const opts = initModel(Model, { formProps: { cols: 4 } })
</script>

<style scoped></style>
