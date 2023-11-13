<template>
  <ext-page>
    <template #query>
      <ext-query ref="queryRef" v-model="queryData" :instance="Model" :load-data="loadData" size="large" />
    </template>
    <ext-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm" />
    <template #form>
      <e-form ref="formRef" v-model="formData" :instance="Model" />
    </template>
  </ext-page>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { useExtView } from '@/components/ext'

  defineOptions({
    name: 'SysRoleList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = useExtView()
</script>

<style scoped></style>
