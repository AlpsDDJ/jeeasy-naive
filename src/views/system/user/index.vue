<template>
  <div class="list-view">
    <div class="data-table-query"></div>
    <div class="data-table-content">
      <n-data-table ref="tableRef" :columns="columns" :data="records" :loading="loading" min-height="200">
        <template #loading>
          <ActionColumn
            :row="{ id: '1' }"
            :index="0"
            :actions="['add', 'delete']"
            @action:delete="editHandle"
            @action:add="addHandle"
          />
        </template>
      </n-data-table>
    </div>
    <div class="data-form">
      <n-drawer v-model:show="showForm">
        <n-form ref="formRef">
          <n-form-item-row span="4">
            <n-form-item-gi span="2">123</n-form-item-gi>
            <n-form-item-gi span="2">321</n-form-item-gi>
            <n-form-item-gi span="2">333</n-form-item-gi>
          </n-form-item-row>
        </n-form>
      </n-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  // const { fields } = useModel(User)
  const { listState, tableRef, columns, formState, formRef } = useListView(User)

  // const { tableRef } = listState

  const { loading, records } = toRefs(listState)

  const { showForm } = toRefs(formState)

  function editHandle(row) {
    console.log('row ---> ', row)
  }

  function addHandle(row) {
    console.log('add row ---> ', row)
  }

  onMounted(() => {
    tableRef.value!.sort('age', 'descend')
    // listState.tableRef.value =
  })

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
