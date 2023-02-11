<template>
  <n-config-provider :theme="theme">
    <dialog-content>
      <loading-content>
        <message-content>
          <content />
        </message-content>
      </loading-content>
    </dialog-content>
  </n-config-provider>
</template>

<script lang="ts" setup name="NaiveProvider">
  import { darkTheme } from 'naive-ui'
  import type { GlobalTheme } from 'naive-ui'
  const theme = ref<GlobalTheme | null>(darkTheme)
</script>

<style scoped></style>
