<template>
  <n-data-table
    ref="tableRef"
    v-bind="{ ...props }"
    :pagination="pageOption"
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
  // const defaultTableProps: DataTableProps = {
  //   minHeight: '200'
  // }

  const props = defineProps({
    ...dataTableProps
    // pagination: {
    //   type: Object as PropType<PaginationProps>,
    //   default: () => ({ page: 1, pageSize: 10 })
    // }
  })

  // const tableProps = { ...props, ...defaultTableProps }

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

  const pageChangeHandle = (pagination) => {
    // emit('page-change', pagination)
    console.log('pagination ==========> ', pagination)
    pageOption.value = { ...pageOption.value, ...pagination }
  }
  // const pagination = props.pagination as PaginationProps
  const emit = defineEmits(['update:pagination'])
  // watch(
  //   pagination,
  //   () => {
  //     emit('page-change', pagination)
  //   },
  //   { deep: true }
  // )

  const pageOption = useVModel(props, 'pagination', emit)
  // console.log('pageValue ----> ', pageValue)

  const tableRef = ref<DataTableInst>()
  defineExpose({
    tableRef
  })
</script>

<style scoped></style>
