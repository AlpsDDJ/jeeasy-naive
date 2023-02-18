<template>
  <div class="list-view">{{ Sys.name }}</div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  const su = new User()
  console.log(su)
  // useListView(su)
</script>

<style scoped></style>
