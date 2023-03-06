<template>
  <n-config-provider :theme="appStore.getTheme">
    <dialog-content>
      <loading-content>
        <message-content>
          <notification-content>
            <content />
          </notification-content>
        </message-content>
      </loading-content>
    </dialog-content>
    <slot />
  </n-config-provider>
</template>

<script lang="ts" setup name="NaiveProvider">
  import { useAppStore } from '@/store/modules/app'
  import NotificationContent from '@/components/NaiveProvider/content/NotificationContent.vue'

  const appStore = useAppStore()
</script>

<style scoped></style>
