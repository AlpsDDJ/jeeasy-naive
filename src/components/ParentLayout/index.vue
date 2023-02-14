<template>
  <n-layout class="layout" :has-sider="true">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="appStore.layout.menuMinWidth"
      :width="appStore.layout.menuWidth"
      :collapsed="appStore.getCollapsed"
      :native-scrollbar="false"
      bordered
      class="layout-sider"
    >
      <layout-logo :collapsed="appStore.getCollapsed" />
      <aside-menu />
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <n-layout-header bordered class="layout-header">
        <layout-header />
      </n-layout-header>
      <tags-view />
      <n-layout class="main-content" :native-scrollbar="false">
        <layout-main />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup name="ParentLayout">
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()
  const headerHeight = ref<string>(`${appStore.layout.headerHeight}px`)
</script>

<style scoped lang="less">
  .layout {
    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }
    .layout-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: v-bind(headerHeight);
      line-height: v-bind(headerHeight);
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>
