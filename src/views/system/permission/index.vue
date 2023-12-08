<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" :defaule-data="{ parentId: '0' }" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm">
      <template ##icon="row">
        <!--<a>{{ index }} - {{ row?.roleCode }}</a>-->
        <icon v-if="row.icon" :icon-name="row.icon"></icon>
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
