<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps">
      <template ##icon="row">
        <icon v-if="row.icon" :icon-name="row.icon"></icon>
      </template>
      <template ##name="row">
        <n-tag v-if="row.menuType === 3" :bordered="false">{{ row.name }}</n-tag>
        <span v-else>{{ row.name }}</span>
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

<style scoped></style>
