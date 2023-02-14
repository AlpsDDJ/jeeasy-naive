<template>
  <div class="logo no-select">
    <transition name="scale" mode="out-in" appear>
      <img :src="Logo" :width="appStore.getCollapsed ? 55 : 120" alt="" :class="{ 'mr-2': !appStore.getCollapsed }" />
      <!--    <span v-show="!appStore.getCollapsed" class="logo-title">{{ appStore.getSiteName }}</span>-->
    </transition>
  </div>
</template>

<script lang="ts" setup name="LayoutLogo">
  import Logo from '@/assets/image/logo.png'
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
    }
    .logo-title {
      margin: 0;
    }
  }
</style>
