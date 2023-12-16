<template>
  <!--<e-modal v-model:show="showDrawer" :width="380" title="代码生成" @ok="handleOk">
    <e-dict-input code="#gen_module" @update:value="(value) => (genData = { ...genData, ...value })" />
    <e-form v-model:model-value="genData" :instance="GenModule" :is-modal="false" />
  </e-modal>-->
  <e-form ref="genModalRef" v-model:model-value="genData" :instance="GenModule" @success="handleOk" />
</template>

<script setup lang="ts">
  // import { SaveRolePermissionParams, SysRoleApi } from '../model'
  import GenModule from '@/views/gen/module/model'

  defineOptions({
    name: 'GenModal'
  })

  const showDrawer = ref<boolean>(false)
  const genData = ref<
    GenModule & {
      tableId?: string
    }
  >({})

  const open = (tid: string) => {
    genData.value.tableId = tid
    showDrawer.value = true
  }
  const close = () => {
    showDrawer.value = false
    return Promise.resolve()
  }

  const handleOk = () => {
    console.log('handleOk --> ', genData)
  }

  defineExpose({
    open,
    close
  })
</script>

<style scoped></style>
