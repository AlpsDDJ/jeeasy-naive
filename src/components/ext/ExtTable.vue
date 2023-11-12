<template>
  <n-data-table
    ref="tableRef"
    v-bind="{ ...props }"
    :columns="columns"
    :loading="loading"
    :data="data"
    :pagination="pagination"
    :remote="true"
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

<script lang="ts" setup generic="T extends BaseModel">
  import { h } from 'vue'
  import type { DataTableColumn, DataTableInst, PaginationProps } from 'naive-ui'
  import type { ExtTableInst, ExtTableProps, TableScrollToOption, IFormType } from './types'
  import { LoadData } from './types'
  import type { ColumnKey, FilterState, SortOrder } from 'naive-ui/es/data-table/src/interface'
  import { BaseModel } from '@/hooks/useModel'
  import { useModelApi } from '@/hooks/useApi'
  import ActionButton from '@/components/ActionButton/index.vue'

  defineOptions({
    name: 'ExtTable'
  })

  const props = withDefaults(defineProps<ExtTableProps<T>>(), {
    actions: 'default'
  })

  const modelState = ref(useModel<T>(props.instance))
  const actions = props.actions

  if (actions !== false) {
    modelState.value.fields['actions'] = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render:
        actions === 'default'
          ? (row, index) =>
              h(ActionButton, {
                actions,
                data: { row, index },
                'onAction:edit': handleEdit,
                'onAction:delete': handleDelete
              })
          : undefined
    }
  }
  const columns = ref(Object.values(modelState.value?.fields || []).filter(({ hidden }) => !hidden))

  // const showFormEmit = defineEmits<{ (evt: 'showForm', formData: any, type: IFormType): void }>()

  const emit = defineEmits<{
    (evt: 'showForm', formData: any, type: IFormType): void
    (evt: 'pageChange', page: PaginationProps | false): void
  }>()

  const showForm = (formData: any, type: IFormType) => {
    // formState.active = true
    // console.log('props.showForm ', props.showForm)
    // props.showForm && props.showForm(type, formData)
    emit('showForm', type, formData)
  }

  const handleDelete = ({ row, index }) => {
    console.log(`删除第${index} 行，id = ${row.id}`)
  }
  const handleEdit = ({ row, index }) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
    showForm(row, FormType.EDIT)
  }

  const slots = useSlots()

  const pagination = defineModel<PaginationProps>('page', {
    local: true,
    default: {
      page: 1,
      pageSize: 5,
      pageCount: 0,
      itemCount: 0,
      showQuickJumper: true,
      showSizePicker: true,
      pageSizes: [3, 5, 10, 20, 50, 100]
    }
  })

  const pageChangeHandle = (page: PaginationProps) => {
    console.log('page = ', page)
    pagination.value = Object.assign(pagination.value, page)
    // pageValue.value && (pageValue.value = { ...pageValue.value, ...pagination })
    loadData()
    emit('pageChange', { ...pagination.value, ...page })
  }

  const tableRef = ref<DataTableInst>()

  const loading = ref<boolean>(false)
  const data = ref<T[]>()
  const { page: loadPage } = useModelApi<T>(modelState.value.api)

  const loadData: LoadData<T> = async (param?: any) => {
    param && console.log(param)
    loading.value = true
    // const { api } = modelState
    const { pageSize, page } = pagination.value
    const params = {
      size: pageSize,
      current: page,
      ...(props.queryData || {}),
      ...param
    }
    try {
      const resp = await loadPage(params)
      const {
        data: { records, size, current, total, pages }
      } = resp
      data.value = records
      loading.value = false

      pagination.value = {
        ...pagination.value,
        page: current,
        pageSize: size,
        itemCount: total,
        pageCount: pages
      }
      return resp.data
    } catch (err) {
      loading.value = false
      return Promise.reject(err || new Error('数据加载失败'))
    }
  }

  const tableExpose: ExtTableInst<T> = {
    loadData,
    filter: (filters: FilterState | null) => {
      tableRef.value!.filter(filters)
    },
    filters: (filters: FilterState | null) => {
      tableRef.value!.filters(filters)
    },
    clearFilters: () => {
      tableRef.value!.clearFilters()
    },
    clearSorter: () => {
      tableRef.value!.clearSorter()
    },
    page: (page: number) => {
      tableRef.value!.page(page)
    },
    sort: (columnKey: ColumnKey, order: SortOrder) => {
      tableRef.value!.sort(columnKey, order)
    },
    scrollTo: (x: number | TableScrollToOption, y?: number) => {
      if (typeof x === 'number') {
        tableRef.value!.scrollTo(x, y!)
      } else {
        tableRef.value!.scrollTo(x as TableScrollToOption)
      }
    },
    clearFilter: () => {
      tableRef.value!.clearFilter()
    }
  }

  defineExpose({
    ...tableExpose
  })

  onMounted(() => {
    const slotsTmp = toRaw(slots)
    Object.keys(slotsTmp).forEach((slotName) => {
      if (slotName.indexOf('#') === 0) {
        const colKey = slotName.replace('#', '')
        const col = props.columns?.find((column) => column['key'] === colKey)
        if (col) {
          ;(col as DataTableColumn)['render'] = (row: any, index: number) => slotsTmp[slotName]?.(row, index)
        }
      }
    })
  })
</script>

<style scoped></style>
