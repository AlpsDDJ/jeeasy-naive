<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm">
      <template ##status="row">
        <n-tag :type="row.status ? 'success' : 'warning'" :bordered="false">{{ row.status_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-model="formData" :instance="Model" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'SysUserList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
</script>

<style scoped></style>
