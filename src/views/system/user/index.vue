<template>
  <div class="list-view">
    <div class="data-table-query">
      <n-card>
        <n-form label-placement="left" :show-feedback="false">
          <n-grid cols="1 600:2 900:3 1200:4 1500:5" :y-gap="8" :x-gap="12" :collapsed="queryCollapsed">
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi label="用户名">
              <n-input placeholder="" />
            </n-form-item-gi>
            <n-form-item-gi suffix class="query-action">
              <action-button :actions="['query', 'reset']" @action:query="loadData" @action:reset="loadData">
                <n-button text type="primary" icon-placement="right" @click="queryCollapsed = !queryCollapsed">
                  {{ queryCollapsed ? '展开' : '收起' }}
                  <template #icon>
                    <n-icon>
                      <icon :icon-name="queryCollapsed ? 'ChevronDown' : 'ChevronUp'" />
                    </n-icon>
                  </template>
                </n-button>
              </action-button>
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

<script lang="ts" setup>
  import { User } from '@/views/system/user/user'

  defineOptions({
    name: 'SysUserList'
  })

  const { tableProps, extRef, loadData, formState } = useListView(User)
  const queryCollapsed = ref(true)

  onMounted(() => {
    // tableRef.value!.page(2)
  })
</script>

<style scoped></style>
