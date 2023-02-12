<template>
  <div class="logo">
    <img :src="Logo" alt="" :class="{ 'mr-2': !appStore.getCollapsed }" />
    <span v-show="!appStore.getCollapsed" class="logo-title">{{ appStore.getSiteName }}</span>
  </div>
</template>

<script lang="ts" setup name="LayoutLogo">
  import Logo from '@/assets/logo.png'
  import { useAppStore } from '@/store/modules/app'
  const appStore = useAppStore()
  const headerHeight = ref<string>(`${appStore.layout.headerHeight}px`)
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: v-bind(headerHeight);
    line-height: v-bind(headerHeight);
    overflow: hidden;
    white-space: nowrap;
    img {
      width: auto;
      height: 32px;
    }
    .logo-title {
      margin: 0;
    }
  }
</style>
