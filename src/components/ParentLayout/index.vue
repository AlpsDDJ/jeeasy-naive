<template>
  <n-layout class="layout" :has-sider="true">
    <aside-menu></aside-menu>
    <n-layout>
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup name="ParentLayout">
  // 不可谓空
</script>

<style scoped lang="less"></style>
