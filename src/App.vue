<template>
  <naive-provider>
    <router-view />
  </naive-provider>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'App'
  })
  // import { useAppStore } from '@/store/modules/app'
  // const appStore = useAppStore()
  // const layoutBackgroundColor = computed(() => {
  //   return appStore.darkTheme ? 'auto' : '#F5F7F9'
  // })
</script>
