<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps">
      <template ##status="row">
        <n-tag :type="row.status ? 'success' : 'warning'" :bordered="false">{{ row.status_dict }}</n-tag>
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
  import { FormatFormData } from '@/components/ext/types'

  defineOptions({
    name: 'SysUserList'
  })

  const beforeShowForm: FormatFormData<Model> = async ({ roles, depts, ...formData }) => {
    return { roles: roles?.map(({ id }: any) => id), depts: depts?.map(({ id }: any) => id), ...formData }
  }

  const beforeSubmit: FormatFormData<Model> = async ({ roles, depts, ...data }) => {
    return { roles, depts, user: data }
  }

  const { refs, props } = initModel(Model, { beforeShowForm, beforeSubmit })
  const { tableRef, formRef, queryRef } = refs
  const { tableProps, formProps, queryProps } = props
</script>

<style scoped></style>
