import { h } from 'vue'
import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'
import { DataTableColumn, DataTableInst, DataTableProps, PaginationProps } from 'naive-ui'
import ActionColumn from '@/components/ExtTable/components/ActionColumn.vue'

export const useListView = <T extends BaseModel>(instance: BaseModelConstructor<T>, option: Record<any, any> = {}) => {
  const tableRef = ref<DataTableInst>()
  const extRef = ref()

  const modelState: ModelState<T> = useModel<T>(instance)
  const { actions = 'default' } = option
  const handleDelete = (row, index) => {
    console.log(`删除第${index} 行，id = ${row.id}`)
  }
  const handleEdit = (row, index) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
    showForm(row, FormType.EDIT)
  }

  enum FormType {
    // EDIT = 'edit',
    // ADD = 'add',
    // VIEW = 'view'
    ADD,
    EDIT,
    VIEW
  }

  // interface PropertyInterface<T> extends Record<T, boolean> {}
  type EnumTypes<T extends string | number> = keyof { [k in T]: unknown }

  const showForm = (formData: any, type: EnumTypes<FormType>) => {
    formState.active = true
    // console.log(formData)
    console.log('FormShowType ---> ', type)
    console.log('FormShowType ---> ', type === FormType.ADD)
  }

  if (actions !== false) {
    modelState.fields['acions'] = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render:
        actions === 'default'
          ? (row, index) => (
              <ActionColumn
                actions={actions}
                row={row}
                index={index}
                onAction:edit={handleEdit}
                onAction:delete={handleDelete}
              ></ActionColumn>
            )
          : undefined
    } as DataTableColumn
  }

  const fields = reactive(modelState.fields)

  const formRef = ref()

  const formState = reactive({
    active: false
  })

  onMounted(() => {
    extRef.value && (tableRef.value = extRef.value.tableRef)
    loadData()
  })

  type PageHandle = {
    (page: PaginationProps): void
  }

  type ExtTableProps = {
    pageHandle: PageHandle
  } & DataTableProps

  /**
   * @param page 分页参数
   */
  const pageHandle: PageHandle = (page: PaginationProps) => {
    loadData(page)
  }

  const defaultTableProps = {
    data: [] as any[],
    columns: Object.values(fields).filter(({ hidden }) => !hidden) as DataTableColumn[],
    pageHandle,
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 0,
      itemCount: 0
    } as PaginationProps
  }

  const tableProps = ref<ExtTableProps>(defaultTableProps)

  function loadData(param?: any) {
    param && console.log(param)
    tableProps.value.loading = true
    setTimeout(() => {
      const itemCount = 17
      tableProps.value.data = []
      let index = 0
      while (index++ < itemCount) {
        tableProps.value.data.push({
          id: `${index}`,
          username: `user ${index}`,
          userNo: `NO.${index}`,
          age: 20 + index * 2
        } as BaseModel)
      }
      tableProps.value.loading = false
    }, 1500)
  }

  return {
    tableProps,
    tableRef,
    extRef,
    loadData,
    formState,
    formRef,
    showForm
  }
}
