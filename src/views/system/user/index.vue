<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showFormAndFormat">
      <template ##status="row">
        <n-tag :type="row.status ? 'success' : 'warning'" :bordered="false">{{ row.status_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-model="formData" :instance="Model" :format-form-data="foramtFormData" @success="loadData()" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'
  import { ShowForm } from '@/components/ext/types'

  defineOptions({
    name: 'SysUserList'
  })

  const showFormAndFormat: ShowForm = (type, { roles, depts, ...formData }) => {
    showForm(type, { roles: roles?.map(({ id }) => id), depts: depts?.map(({ id }) => id), ...formData })
  }

  const foramtFormData = ({ roles, depts, ...data }: any) => {
    return { roles, depts, user: data }
  }

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
</script>

<style scoped></style>
