<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm">
      <template ##roleCode="row, index">
        <a>{{ index }} - {{ row?.roleCode }}</a>
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
    name: 'SysRoleList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
</script>

<style scoped></style>
