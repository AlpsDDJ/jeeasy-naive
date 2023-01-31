<template>
  <n-config-provider :theme="theme">
    <slot />
  </n-config-provider>
</template>

<script lang="ts" setup name="NaiveProvider">
  // import { darkTheme } from 'naive-ui'
  import type { GlobalTheme } from 'naive-ui'
  // import LoadingContent from './content/LoadingContent.vue'
  // import DialogContent from './content/DialogContent.vue'
  // import MessageContent from './content/MessageContent.vue'
  const theme = ref<GlobalTheme | null>(null)
</script>

<style scoped></style>
