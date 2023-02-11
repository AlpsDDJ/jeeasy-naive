<template>
  <n-config-provider :theme="settingStore.getTheme">
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
  import { useSettingStore } from '@/store/modules/setting'

  const settingStore = useSettingStore()
</script>

<style scoped></style>
