<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" :defaule-data="{ parentId: '0' }" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm">
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
      <e-form ref="formRef" v-model:model-value="formData" :instance="Model" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'SysPermissionList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
</script>

<style scoped></style>
