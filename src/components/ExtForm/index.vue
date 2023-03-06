<template>
  <n-form v-bind="props"> </n-form>
</template>

<script lang="ts" setup name="ExtForm">
  import { formProps } from 'naive-ui'
  const props = defineProps({
    ...formProps
  })
</script>

<style scoped></style>
