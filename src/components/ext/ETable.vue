<template>
  <n-space vertical>
    <slot name="toolBar">
      <action-button :actions="['add']" @action:add="handleAdd" />
    </slot>
    <n-config-provider :theme-overrides="enableEdit ? editTableThemeOverrides : {}">
      <n-form ref="tableEditFormRef" :model="tableData">
        <n-data-table
          ref="tableRef"
          v-bind="tableProps"
          :columns="columns"
          :loading="loading"
          :data="tableData"
          :pagination="showPage && pagination"
          :remote="true"
          :tree="!!treeField"
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
          <template v-if="$slots.loading" #loading>
            <slot name="loading" />
          </template>
          <template v-if="$slots.empty" #empty>
            <slot name="empty" />
          </template>
        </n-data-table>
      </n-form>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts" setup generic="T extends BaseModel">
  import { h } from 'vue'
  import type { DataTableColumn, DataTableInst, PaginationProps } from 'naive-ui'
  import type { ETableInst, ETableProps, ETableSlots, IFormData, IFormType, LoadData, TableScrollToOption } from './types'
  import type { ColumnKey, FilterState, SortOrder } from 'naive-ui/es/data-table/src/interface'
  import { BaseModel } from '@/hooks/useModel'
  import { useModelApi } from '@/hooks/useApi'
  import { appSetting } from '@/config/app.config'
  import ActionButton from '@/components/ActionButton/index.vue'
  import { cloneDeep } from 'lodash-es'
  import { ActionOption } from '@/components/ActionButton/commonActions'
  import { createInputComponent } from '@/components/ext/index'
  import { FormType } from '@/enums/EEnum'
  import { GlobalThemeOverrides } from 'naive-ui'

  defineOptions({
    name: 'ETable'
  })

  const props = withDefaults(defineProps<ETableProps<T>>(), {
    actions: 'default',
    tableProps: () => ({}),
    beforeQuery: (queryData: any) => queryData,
    data: () => [],
    showPage: true,
    enableEdit: false
  })
  const tableEditFormRef = ref()

  const modelState = ref(useModel<T>(props.instance))
  const actions = props.actions

  const handleAdd = () => {
    showForm({}, FormType.ADD)
  }
  const handleDelete = ({ row, index }) => {
    console.log(`删除第${index} 行，id = ${row.id}`)
  }
  const handleEdit = ({ row, index }) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
    showForm(row, FormType.EDIT)
  }

  const defaultActions: ActionOption[] = [
    {
      action: 'edit',
      html: '编辑',
      text: true,
      type: 'primary',
      isDisabled: true,
      autoShow: true,
      handle: handleEdit
    },
    {
      action: 'delete',
      html: '删除',
      text: true,
      type: 'error',
      autoShow: true,
      handle: handleDelete
    }
  ]

  const actionRender = (row, index) => {
    let _actions: ActionOption[] = []
    if (typeof actions === 'object') {
      actions.forEach((act) => {
        if (typeof act === 'string') {
          const option = defaultActions.find(({ action }) => act == action)
          if (option) {
            _actions.push(option)
          }
        } else {
          _actions.push(act)
        }
      })
    } else {
      _actions = defaultActions
    }
    return h(ActionButton, {
      actions: _actions,
      data: { row, index },
      divider: true
    })
  }

  if (actions !== false) {
    modelState.value.fields['actions'] = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: actions === 'default' ? 140 : typeof actions !== 'boolean' ? actions.length * 70 : 0,
      render: actionRender
    }
  }

  const editTableThemeOverrides = ref<GlobalThemeOverrides>({
    common: {
      borderRadius: '0',
      inputColor: 'transparent'
    },
    DataTable: {
      tdPaddingSmall: '0',
      tdPaddingMedium: '0',
      tdPaddingLarge: '0',
      borderRadius: '3px'
    },
    Input: {
      border: 'none'
    },
    InternalSelection: {
      border: 'none'
    }
  })

  const columns = computed(() =>
    Object.values(modelState.value?.fields || {})
      .filter(({ hidden }) => !(hidden === true || (hidden && hidden?.includes('list'))))
      .map((col) => {
        if (props.enableEdit) {
          return {
            ...col,
            render: (_, index: number) => {
              return h(
                'div',
                {
                  class: 'editable-cell'
                },
                [createInputComponent<T>(col, toRef(tableData.value[index]), FormType.EDIT_TABLE)]
              )
            }
          }
        } else {
          return col
        }
      })
  )

  // const showFormEmit = defineEmits<{ (evt: 'showForm', formData: any, type: IFormType): void }>()

  const emit = defineEmits<{
    (evt: 'showForm', type: IFormType, formData: IFormData<T>): void
    (evt: 'pageChange', page: PaginationProps | false): void
  }>()

  const showForm = (formData: any, type: IFormType) => {
    emit('showForm', type, formData)
  }

  // const slots = useSlots()

  const pagination = defineModel<PaginationProps>('page', {
    local: true,
    default: {
      page: 1,
      pageSize: appSetting.pageSizes[0] || 10,
      pageCount: 0,
      itemCount: 0,
      showQuickJumper: true,
      showSizePicker: true,
      pageSizes: appSetting.pageSizes,
      prefix: ({ itemCount }) => `共 ${itemCount} 项 `
    }
  })

  const pageChangeHandle = (page: PaginationProps) => {
    // console.log('page = ', page)
    pagination.value = Object.assign(pagination.value, page)
    // pageValue.value && (pageValue.value = { ...pageValue.value, ...pagination })
    loadData()
    emit('pageChange', { ...pagination.value, ...page })
  }

  const tableRef = ref<DataTableInst>()

  const loading = ref<boolean>(false)
  const tableData = ref<T[]>(props.data)
  const { page: loadPage } = useModelApi<T>(modelState.value.api)

  const treeField = modelState.value.tree as TreeField<T>

  const loadData: LoadData<T> = async (param?: any) => {
    loading.value = true
    const { pageSize, page } = pagination.value
    const params = {
      size: pageSize,
      current: page,
      ...(props.queryData || {}),
      ...param
    }
    try {
      const resp = await loadPage(props.beforeQuery(params))
      const {
        data: { records, size, current, total, pages }
      } = resp
      tableData.value = cloneDeep(records)
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

  const tableExpose: ETableInst<T> = {
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

  const slots = defineSlots<ETableSlots<T>>()

  onMounted(() => {
    const slotsTmp = toRaw(slots)
    Object.keys(slotsTmp).forEach((slotName) => {
      if (slotName.indexOf('#') === 0) {
        const colKey = slotName.replace('#', '')
        const col = columns.value?.find((column) => column['key'] === colKey)
        if (col) {
          ;(col as DataTableColumn)['render'] = (row: any, index: number) => slotsTmp[slotName]?.(row, index)
        }
      }
    })
  })
</script>

<style lang="less">
  .editable-cell {
    &:child {
      background: transparent !important;
    }
    .n-base-suffix {
      display: none;
    }
  }
</style>
