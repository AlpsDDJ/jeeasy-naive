<template>
  <n-layout class="console-view">
    <div> 主控台 - {{ label }}</div>
  </n-layout>
</template>

<script lang="ts" setup name="Console">
  //主控台
  import { User } from '@/views/system/user/user'
  const { label } = useModel(User)
  onMounted(() => {
    setTimeout(() => {
      label.username = '账号3'
    }, 2000)
  })
</script>

<style scoped lang="less">
  .console-view {
    min-height: 100%;
  }
</style>
