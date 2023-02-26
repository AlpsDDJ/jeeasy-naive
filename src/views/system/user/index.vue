<template>
  <div class="list-view">
    <div class="data-table-query">
      <n-card>
        <n-form label-placement="left" :show-feedback="false">
          <n-grid cols="1 600:2 900:3 1200:4 1500:5">
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-card>
    </div>
    <div class="data-table-content">
      <n-card>
        <ext-table
          ref="extRef"
          v-bind="tableProps"
          v-model:pagination="tableProps.pagination"
          @page="tableProps.pageHandle"
        />
      </n-card>
    </div>
    <div class="data-form">
      <n-drawer v-model:show="formState.active"> </n-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup name="SysUserList">
  import { User } from '@/views/system/user/user'

  const { tableProps, tableRef, extRef, formState } = useListView(User)

  onMounted(() => {
    tableRef.value!.page(2)
  })
</script>

<style scoped></style>
