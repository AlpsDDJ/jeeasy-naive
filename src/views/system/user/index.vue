<template>
  <div class="list-view">
    <div class="data-table-content">
      <n-data-table
        :columns="columns.filter((item) => !item.hidden)"
        :data="records"
        :loading="loading"
        min-height="200"
      ></n-data-table>
    </div>
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  const { fields } = useModel(User)
  const { listState } = useListView(User)

  const { loading, records } = toRefs(listState)

  const columns = computed(() => {
    return Object.values(fields)
  })

  // const records: User[] = [
  //   {
  //     username: 'admin',
  //     password: '123456'
  //   },
  //   {
  //     username: '张三',
  //     password: '654321'
  //   }
  // ]
</script>

<style scoped></style>
