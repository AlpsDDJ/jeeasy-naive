<template>
  <n-config-provider :theme="appStore.getTheme" :locale="zhCN" :date-locale="dateZhCN" :hljs="hljs">
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
  import hljs from 'highlight.js/lib/core'
  import typescript from 'highlight.js/lib/languages/typescript'
  import javascript from 'highlight.js/lib/languages/javascript'
  import java from 'highlight.js/lib/languages/java'
  import xml from 'highlight.js/lib/languages/xml'

  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('java', java)
  hljs.registerLanguage('xml', xml)

  defineOptions({
    name: 'NaiveProvider'
  })

  const appStore = useAppStore()
</script>

<style scoped></style>
