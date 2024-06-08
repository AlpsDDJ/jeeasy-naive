<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps" :before-query="beforeQuery">
      <template ##status="row">
        <n-tag :type="row.status ? 'success' : 'warning'" :bordered="false">{{ row.status_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-bind="formProps" :format-form-data="formatFormData" :before-submit="beforeSubmit" />
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

  const beforeQuery: FormatFormData<Model> = async (formData) => {
    return { ...formData, ddd: 123312 }
  }

  const formatFormData: FormatFormData<Model> = async (formData) => {
    const { roles, depts } = formData
    const newVar = { ...formData, roles: roles?.map(({ id }: any) => id), depts: depts?.map(({ id }: any) => id) }
    console.log('newVar ---> ', newVar)
    return newVar
  }

  const beforeSubmit: FormatFormData<Model> = async ({ roles, depts, ...data }) => {
    return { roles, depts, user: data }
  }

  const { refs, commProps } = initModel(Model)
  const { tableRef, formRef, queryRef } = refs
  const { tableProps, formProps, queryProps } = commProps
</script>

<style scoped></style>
