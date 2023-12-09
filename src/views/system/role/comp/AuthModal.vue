<template>
  <e-modal v-model:show="showAuthDrawer" :width="380" title="角色授权" @ok="handleOk">
    <n-form>
      <e-dict-input v-model:value="authData.permissions" code="#sys_permission" component="tree" top-pid="0" multiple async />
    </n-form>
  </e-modal>
</template>

<script setup lang="ts">
  import { SaveRolePermissionParams, SysRoleApi } from '../model'

  defineOptions({
    name: 'AuthModal'
  })

  const showAuthDrawer = ref<boolean>(false)
  const authData = ref<SaveRolePermissionParams>({
    roleId: '',
    permissions: []
  })

  const open = (rid: string) => {
    showAuthDrawer.value = true
    authData.value.roleId = rid
    SysRoleApi.getRolePermission({ id: rid }).then((resp) => {
      authData.value.permissions = resp.data.map(({ id }) => id)
    })
  }
  const close = () => {
    showAuthDrawer.value = false
    return Promise.resolve()
  }

  const handleOk = () => {
    SysRoleApi.saveRolePermission(authData.value)
      .then((resp) => {
        window.$message.success(resp.data || resp.message || '操作成功')
      })
      .catch((error) => {
        window.$message.error(error.message || '操作失败')
      })
  }

  defineExpose({
    open,
    close
  })
</script>

<style scoped></style>
