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

<script lang="ts" setup name="LayoutMain"></script>

<style lang="less" scoped>
  .router_animate-enter-active {
    animation: slideInLeft 0.5s;
  }
  .router_animate-leave-active {
    animation: slideOutLeft 0.3s;
    // 防止切换过程中页面上下抖动
    display: none;
  }
</style>
