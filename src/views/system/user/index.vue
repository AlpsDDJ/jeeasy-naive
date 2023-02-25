<template>
  <div class="list-view">
    <div class="data-table-query"></div>
    <div class="data-table-content">
      <ext-table ref="extRef" :columns="columns" :data="records" :loading="loading" min-height="200">
        <!--        <template ##action="row, index">
          <ActionColumn
            :row="row"
            :index="index"
            :actions="['view', 'delete']"
            @action:delete="editHandle"
            @action:view="addHandle"
          />
        </template>
        <template ##age> 00000 </template>-->
      </ext-table>
    </div>
    <div class="data-form">
      <n-drawer v-model:show="formState.active">
        <!--        <n-form ref="formRef">
          <n-form-item-row span="4">
            <n-form-item-gi span="2">123</n-form-item-gi>
            <n-form-item-gi span="2">321</n-form-item-gi>
            <n-form-item-gi span="2">333</n-form-item-gi>
          </n-form-item-row>
        </n-form>-->
      </n-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  // const { fields } = useModel(User)
  const { listState, tableRef, extRef, columns, formState } = useListView(User)

  // const { tableRef } = listState

  const { loading, records } = toRefs(listState)

  onMounted(() => {
    tableRef.value!.page(1)
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
