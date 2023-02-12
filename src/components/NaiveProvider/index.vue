<template>
  <n-config-provider :theme="appStore.getTheme">
    <dialog-content>
      <loading-content>
        <message-content>
          <content />
        </message-content>
      </loading-content>
    </dialog-content>
    <slot />
  </n-config-provider>
</template>

<script lang="ts" setup name="NaiveProvider">
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()
</script>

<style scoped></style>
