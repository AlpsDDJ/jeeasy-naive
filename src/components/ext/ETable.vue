<template>
  <n-space vertical>
    <slot name="toolBar">
      <n-space>
        <action-button :actions="topActions" @action:add="handleAdd" />
        <div v-if="checkedRowKeys && checkedRowKeys.length > 0">
          <n-button
            secondary
            type="error"
            @click="
              () => {
                handleDelete(...(checkedRowKeys || []))
              }
            "
            >删除</n-button
          >
        </div>
        <slot name="toolBarEnd" />
      </n-space>
    </slot>
    <n-config-provider :theme-overrides="enableEdit ? editTableThemeOverrides : {}">
      <n-form ref="tableEditFormRef" :model="tableData" :show-label="false" inline :show-feedback="false">
        <n-data-table
          ref="tableRef"
          v-bind="tableProps"
          :columns="columns"
          :loading="loading"
          :data="tableData"
          :pagination="showPage === false ? false : pagination"
          :row-key="(row: T) => row[dateKey ?? 'id'] ?? row?.toString()"
          :remote="true"
          :tree="!!treeField"
          @update:checked-row-keys="(val: string[]) => (checkedRowKeys = val)"
          @update:page="
            (page: number) => {
              pageChangeHandle({ page })
            }
          "
          @update:page-size="
            (pageSize: number) => {
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
  import type { DataTableInst, GlobalThemeOverrides, PaginationProps } from 'naive-ui'
  import { FormItemGiProps, NFormItem, useThemeVars } from 'naive-ui'
  import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
  import type { ActionOption } from '@/components/ActionButton/commonActions'
  import ActionButton from '@/components/ActionButton/index.vue'
  import { cloneDeep, isArray } from 'lodash-es'
  import { BaseModel } from '@/hooks/useModel'
  import { appSetting } from '@/config/app.config'
  import { createInputComponent } from '@/components/ext/index'
  import type { ETableInst, ETableProps, ETableSlots, LoadData } from './types'
  import type { FieldOption, FormType, IFormData, TreeField } from 'easy-descriptor'
  import { EzModelOptions, FormTypeEnum } from 'easy-descriptor'
  import { EzFieldOption } from '@/hooks/useModel/types'

  defineOptions({
    name: 'ETable'
  })
  // useModel() called with prop "checked-row-keys" which is not declared.

  const props = withDefaults(defineProps<ETableProps<T>>(), {
    actions: 'default',
    topActions: () => ['add'],
    tableProps: () => ({}),
    beforeQuery: async (queryData: IFormData<T>) => queryData,
    data: () => [],
    showPage: undefined,
    enableEdit: false,
    autoLoad: true,
    dataKey: 'id'
  })
  const tableEditFormRef = ref()
  const checkedRowKeys = defineModel<string[]>('checkedRowKeys', { default: () => [] })

  const modelState = ref<EzModelOptions<T>>(props.modelOptions)
  const actions = props.actions

  const handleAdd = () => {
    showForm({}, FormTypeEnum.ADD)
    // if (props.enableEdit) {
    //   tableData.value?.push(new props.instance())
    // }
  }
  const handleDelete = (...ids: DataKey[]) => {
    console.log(`删除第行，id = ${ids}`)
  }
  const handleEdit = ({ row, index }) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
    showForm(row, FormTypeEnum.EDIT)
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

  const rowActionRender = (row, index) => {
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
    console.log('modelState.value --11--> ', modelState.value)
    modelState.value.fields['actions'] = {
      label: '操作',
      key: 'action',
      fixed: 'right',
      width: actions === 'default' ? 140 : typeof actions !== 'boolean' ? actions.length * 70 : 0,
      render: rowActionRender
    } as EzFieldOption
    console.log('modelState.value --22--> ', modelState.value)
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
      border: 'none',
      borderDisabled: 'none'
    },
    InternalSelection: {
      border: 'none',
      borderDisabled: 'none'
    }
  })

  /**
   * 创建表单项属性
   * @param field
   */
  const createFormItemProps = (field: FieldOption<T>): FormItemGiProps => {
    const { key, path, rule, rulePath, required, formSpan, label } = field
    const _rule: any[] = []
    if (rule) {
      if (isArray(rule)) {
        _rule.push(...rule.filter(({ formTypes }) => !formTypes || formTypes.includes(FormTypeEnum.EDIT_TABLE as any)))
      } else if (!rule.formTypes || rule.formTypes.includes(FormTypeEnum.EDIT_TABLE as any)) {
        _rule.push(rule)
      }
    }
    const _key = (path || key).toString()
    return { path: _key, rule: _rule, rulePath, required, label, span: formSpan }
  }

  const commonFields: Record<'$index' | '$selection', EzFieldOption> = {
    $index: {
      key: 'index',
      title: '#',
      hidden: ['query', 'form'],
      width: 50,
      align: 'center',
      render: (_, index) => h('div', { class: 'index-column' }, index + 1)
    },
    $selection: {
      type: 'selection',
      key: 'selection',
      width: 50,
      align: 'center',
      hidden: ['query', 'form']
    }
  }

  const columns = computed(() =>
    Object.values(modelState.value?.fields || {})
      .filter(({ hidden }) => !(hidden === true || (hidden && hidden?.includes('list'))))
      .map((col) => {
        if (col.key && commonFields[col.key]) {
          return {
            ...commonFields[col.key],
            ...col
          }
        }

        if (props.enableEdit) {
          return {
            ...col,
            title: col.label,
            render: (_, index: number) => {
              const fData = ref<IFormData<T> | undefined>(tableData.value?.[index])
              const child = createInputComponent<T>(col, fData as any, FormTypeEnum.EDIT_TABLE)
              const disabled = child.props?.disabled
              return h(
                NFormItem,
                {
                  ...createFormItemProps(col),
                  class: ['editable-cell', disabled ? 'disabled-cell' : '']
                },
                () => child
              )
            }
          } as TableColumn
        } else {
          return { ...col, title: col.label } as TableColumn
        }
      })
  )

  // const slots = useSlots()
  const defaultPage: PaginationProps = {
    page: 1,
    pageSize: appSetting.pageSizes[0] || 10,
    pageCount: 0,
    itemCount: 0,
    showQuickJumper: true,
    showSizePicker: true,
    pageSizes: appSetting.pageSizes,
    prefix: ({ itemCount }) => `共 ${itemCount} 项 `
  }

  const pagination = ref<PaginationProps>(cloneDeep(defaultPage))

  const load: LoadData<T> = async (params?: any) => {
    loading.value = true
    if (!props.loadData) {
      tableData.value = props.data || []
      return {} as any
    }
    const pageData = await props.loadData(await props.beforeQuery(params)).finally(() => {
      loading.value = false
    })
    const { records, size, current, total, pages } = pageData
    tableData.value = records

    pagination.value = {
      ...pagination.value,
      page: current,
      pageSize: size,
      itemCount: total,
      pageCount: pages
    }
    return pageData
  }

  const pageChangeHandle = (page: PaginationProps) => {
    pagination.value = Object.assign(pagination.value, page)
    load(page)
  }

  const tableRef = defineModel<DataTableInst>('bindRef')

  const loading = ref<boolean>(false)
  const tableData = ref<T[]>()
  tableData.value = props.data
  // const { page: loadPage } = useModelApi<T>(modelState.api)

  const treeField = modelState.value.tree as TreeField<T>

  const emit = defineEmits<{
    (evt: 'showForm', formData: IFormData<T>, type: FormType): void
  }>()

  const showForm = (formData: any, type: FormType) => {
    emit('showForm', formData, type)
    if (props.formInst?.value) {
      props.formInst.value.open(type, formData)
    } else {
      !props.enableEdit && console.warn(`${props.modelOptions.name}: formInst is not defined`)
    }
  }

  defineExpose<ETableInst<T>>({
    reload: load,
    getPageParams: () => unref(pagination) as PaginationProps,
    getCheckedRows: () => tableData.value?.filter(({ id }) => id && checkedRowKeys.value?.includes(id)) || []
  })

  const slots = defineSlots<ETableSlots<T>>()

  onMounted(async () => {
    const slotsTmp = toRaw(slots)
    Object.keys(slotsTmp).forEach((slotName) => {
      if (slotName.indexOf('#') === 0) {
        const colKey = slotName.replace('#', '')
        const col = columns.value?.find((column) => column['key'] === colKey)
        if (col) {
          ;(col as TableColumn)['render'] = (row: any, index: number) => slotsTmp[slotName]?.(row, index)
        }
      }
    })
    tableData.value = props.data || []
    props.autoLoad && (await load())
  })
  const inputColorDisabled = useThemeVars().value.inputColorDisabled //computed(() => themeVars.value.inputColorDisabled)
</script>

<style lang="less">
  .editable-cell {
    &:child {
      background: transparent !important;
    }
    .n-base-suffix {
      display: none;
    }
    //.n-form-item-feedback-wrapper {
    //  margin-bottom: -24px;
    //}
  }
  td.n-data-table-td:has(div.disabled-cell) {
    background-color: v-bind(inputColorDisabled);
    & div.n-input--disabled,
    div.n-base-selection--disabled,
    div.n-base-selection-label {
      background-color: transparent;
    }
  }
</style>
