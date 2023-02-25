<template>
  <n-data-table ref="tableRef" v-bind="{ ...attrs }">
    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="slots.empty" #empty>
      <slot name="empty" />
    </template>
  </n-data-table>
</template>

<script lang="ts" setup name="ExtTable">
  import { DataTableColumn, DataTableInst } from 'naive-ui'
  // import { ExtractPublicPropTypes } from 'naive-ui/es/_utils'
  // import { ExtractPropTypes } from 'vue'
  // import {ExtractPropTypes} from "vue";
  // type themePropKeys = keyof typeof useTheme.props
  // type RemoveReadonly<T> = {
  //   -readonly [key in keyof T]: T[key]
  // }
  // type ExtractPublicPropTypes<T> = Omit<
  //   Partial<RemoveReadonly<ExtractPropTypes<T>>>,
  //   Extract<keyof T, `internal${string}`>
  // >

  // type ExtTableProps = DataTableProps

  // const props: ExtTableProps = defineProps({})

  const attrs = useAttrs()

  const columns = ref<DataTableColumn[]>(attrs.columns as DataTableColumn[])

  const slots = useSlots()
  onMounted(() => {
    const slotsTmp = toRaw(slots)
    // console.log('slots --- ', toRaw(slots))
    Object.keys(slotsTmp).forEach((slotName) => {
      if (slotName.indexOf('#') === 0) {
        const colKey = slotName.replace('#', '')
        const col = columns.value.find((column) => column['key'] === colKey)
        // console.log('col ------------------- ', col)
        if (col) {
          // console.log('slotsTmp[slotName] --- ', toRef(slots, slotName).value?.())
          ;(col as DataTableColumn)['render'] = (row: any, index: number) => slotsTmp[slotName]?.(row, index)
        }
        // ?.render = () => slotsTmp[slotName]
      }
    })
  })

  const tableRef = ref<DataTableInst>()
  defineExpose({
    tableRef
  })
</script>

<style scoped></style>
