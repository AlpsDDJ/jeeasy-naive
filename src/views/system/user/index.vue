<template>
  <div class="list-view">
    <div class="data-table-content">
      <n-data-table :columns="columns.filter((item) => !item.hidden)" :data="records"></n-data-table>
    </div>
    api -- {{ api }} | name -- {{ name }} | perms -- {{ perms }}
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  const { api, name, perms, fields } = useModel(User)

  const columns = computed(() => {
    return Object.values(fields)
  })

  const records: User[] = [
    {
      username: 'admin',
      password: '123456'
    },
    {
      username: '张三',
      password: '654321'
    }
  ]
</script>

<style scoped></style>
