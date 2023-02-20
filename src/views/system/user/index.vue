<template>
  <div class="list-view">
    <div class="data-table-content">
      <n-data-table :columns="columns" :data="records" :loading="loading" min-height="200"></n-data-table>
      <ActionColumn :row="{ id: '1' }" :index="0" actions @action:edit="editHandle"></ActionColumn>
    </div>
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  // const { fields } = useModel(User)
  const { listState, columns } = useListView(User)

  const { loading, records } = toRefs(listState)

  function editHandle(row) {
    console.log('row ---> ', row)
  }

  // const columns = computed(() => {
  //   return Object.values(fields)
  // })

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
