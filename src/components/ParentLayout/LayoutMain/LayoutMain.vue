<template>
  <div class="main-content">
    <router-view v-slot="{ Component, route }">
      <transition name="router_animate">
        <keep-alive v-if="route.meta.keepAlive" :include="[]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup name="LayoutMain">
  import { useAppStore } from '@/store/modules/app'
  const appStore = useAppStore()
  const layoutBackgroundColor = computed(() => {
    return appStore.darkTheme ? 'auto' : '#F5F7F9'
  })
</script>

<style lang="less" scoped>
  .main-content {
    background-color: v-bind(layoutBackgroundColor);
  }
  .router_animate-enter-active {
    animation: slideInRight 0.3s;
  }
  .router_animate-leave-active {
    animation: slideOutLeft 0.2s;
    // 防止切换过程中页面上下抖动
    display: none;
  }
</style>
