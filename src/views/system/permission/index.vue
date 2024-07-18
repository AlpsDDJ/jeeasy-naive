<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps">
      <template ##name="row">
        <div class="permission-name">
          <icon v-if="row.icon" :icon-name="row.icon" style="margin-right: 4px"></icon>
          <n-tag v-if="row.menuType === 3" :bordered="false" :type="row.perms?.includes('delete') ? 'error' : 'primary'">{{ row.name }}</n-tag>
          <template v-else>{{ row.name }}</template>
        </div>
      </template>
      <template ##enableFlag="row">
        <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-bind="formProps" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'SysPermissionList'
  })

  const { refs, commProps } = initModel(Model)
  const { tableRef, formRef, queryRef } = refs
  const { tableProps, formProps, queryProps } = commProps
</script>

<style scoped lang="less">
  .permission-name {
    padding-top: 6px;
    display: inline-flex;
    align-items: center;
  }
</style>
