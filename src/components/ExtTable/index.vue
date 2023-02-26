<template>
  <n-data-table
    ref="tableRef"
    v-bind="{ ...props }"
    :pagination="pageValue"
    :remote="false"
    @update:page="
      (page) => {
        pageChangeHandle({ page })
      }
    "
    @update:page-size="
      (pageSize) => {
        pageChangeHandle({ pageSize })
      }
    "
  >
    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="slots.empty" #empty>
      <slot name="empty" />
    </template>
  </n-data-table>
</template>

<script lang="ts" setup name="ExtTable">
  import type { DataTableColumn, DataTableInst } from 'naive-ui'
  import { dataTableProps } from 'naive-ui'

  const attrs = useAttrs()

  const columns = ref<DataTableColumn[]>(attrs.columns as DataTableColumn[])

  const props = defineProps({
    ...dataTableProps
  })

  const slots = useSlots()
  onMounted(() => {
    const slotsTmp = toRaw(slots)
    Object.keys(slotsTmp).forEach((slotName) => {
      if (slotName.indexOf('#') === 0) {
        const colKey = slotName.replace('#', '')
        const col = columns.value.find((column) => column['key'] === colKey)
        if (col) {
          ;(col as DataTableColumn)['render'] = (row: any, index: number) => slotsTmp[slotName]?.(row, index)
        }
      }
    })
  })

  const pageValue = ref(props.pagination)
  const emit = defineEmits(['update:pagination', 'page'])

  const pageChangeHandle = (pagination) => {
    pageValue.value = { ...pageValue.value, ...pagination }
    emit('update:pagination', pageValue.value)
    emit('page', pageValue.value)
  }

  const tableRef = ref<DataTableInst>()
  defineExpose({
    tableRef
  })
</script>

<style scoped></style>
