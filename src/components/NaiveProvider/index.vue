<template>
  <n-config-provider :theme="appStore.getTheme" :locale="zhCN" :date-locale="dateZhCN">
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

<script lang="ts" setup>
  import { useAppStore } from '@/store/modules/app'
  import NotificationContent from '@/components/NaiveProvider/content/NotificationContent.vue'
  import { zhCN, dateZhCN } from 'naive-ui'

  defineOptions({
    name: 'NaiveProvider'
  })

  const appStore = useAppStore()
</script>

<style scoped></style>
