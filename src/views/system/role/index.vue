<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps" :actions="rowActions">
      <template ##status="row">
        <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-bind="formProps" />
    </template>
    <auth-modal ref="authModalRef" />
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'
  import { ButtonActions } from '@/components/ActionButton/commonActions'
  import AuthModal from '@/views/system/role/comp/AuthModal.vue'

  defineOptions({
    name: 'SysRoleList'
  })

  const { refs, commProps } = initModel(Model)
  const { tableRef, formRef, queryRef } = refs
  const { tableProps, formProps, queryProps } = commProps

  const authModalRef = ref()

  const handleAuth = ({ row: { id: roleId } }) => {
    authModalRef.value.open(roleId)
  }

  const rowActions: ButtonActions = [
    'edit',
    {
      action: 'auth',
      html: '授权',
      text: true,
      type: 'warning',
      handle: handleAuth
    },
    'delete'
  ]
</script>

<style scoped></style>
