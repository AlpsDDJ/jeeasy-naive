<template>
  <div>
    <e-model>
      <template #top>
        <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" />
      </template>
      <e-table ref="tableRef" :instance="Model" :query-data="queryData" :actions="rowActions" @show-form="showForm">
        <template ##enableFlag="row">
          <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
        </template>
      </e-table>
      <template #bottom>
        <e-form ref="formRef" v-model="formData" :instance="Model" @success="loadData()" />
      </template>
    </e-model>
    <auth-modal ref="authModalRef" />
  </div>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'
  import { ButtonActions } from '@/components/ActionButton/commonActions'
  import AuthModal from '@/views/system/role/comp/AuthModal.vue'

  defineOptions({
    name: 'SysRoleList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()

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
