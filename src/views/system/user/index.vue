<template>
  <e-model>
    <template #query>
      <e-search ref="queryRef" v-model="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm" />
    <template #form>
      <e-form ref="formRef" v-model="formData" :instance="Model" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { createEModel } from '@/components/ext'

  defineOptions({
    name: 'SysUserList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = createEModel()
</script>

<style scoped></style>
