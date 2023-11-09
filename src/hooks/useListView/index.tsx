import { h } from 'vue'
import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'
import { DataTableColumn, DataTableInst, DataTableProps, PaginationProps } from 'naive-ui'
import ActionButton from '@/components/ActionButton/index.vue'
import { useModelApi } from '@/hooks/useApi'

export const useListView = <T extends BaseModel>(instance: BaseModelConstructor<T>, option: Record<any, any> = {}) => {
  const tableRef = ref<DataTableInst>()
  const extRef = ref()

  const modelState: ModelState<T> = useModel<T>(instance)
  const { actions = 'default' } = option
  const handleDelete = ({ row, index }) => {
    console.log(`删除第${index} 行，id = ${row.id}`)
  }
  const handleEdit = ({ row, index }) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
    showForm(row, FormType.EDIT)
  }

  const showForm = (formData: any, type: IFormType) => {
    formState.active = true
    formRef.value?.show(type, formData)
  }

  if (actions !== false) {
    modelState.fields['actions'] = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render:
        actions === 'default'
          ? (row, index) => (
              <ActionButton
                actions={actions}
                data={{ row, index }}
                onAction:edit={handleEdit}
                onAction:delete={handleDelete}
              ></ActionButton>
            )
          : undefined
    } as DataTableColumn
  }

  const fields = reactive(modelState.fields)

  const formRef = ref<ExtFormInst<T>>()
  const formData = ref<IFormData<T>>()

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
  const pageHandle: PageHandle = async (page: PaginationProps) => {
    await loadData(page)
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

  // console.log('modelState.api = ', modelState.api)
  const { page: loadPage } = useModelApi(modelState.api)

  async function loadData(param?: any) {
    param && console.log(param)
    tableProps.value.loading = true
    // const { api } = modelState
    const { pageSize, page } = tableProps.value.pagination as PaginationProps
    const params = {
      size: pageSize,
      current: page
    }
    const resp = await loadPage(params)
    const {
      data: { records, size, current, total, pages }
    } = resp
    // console.log('data ---> ', resp.data)
    tableProps.value.data = records
    tableProps.value.loading = false
    tableProps.value.pagination = {
      ...tableProps.value.pagination,
      page: current,
      pageSize: size,
      itemCount: total,
      pageCount: pages
    }

    // setTimeout(() => {
    //   const itemCount = 17
    //   tableProps.value.data = []
    //   let index = 0
    //   while (index++ < itemCount) {
    //     tableProps.value.data.push({
    //       id: `${index}`,
    //       username: `user ${index}`,
    //       userNo: `NO.${index}`,
    //       age: 20 + index * 2
    //     } as BaseModel)
    //   }
    //   tableProps.value.loading = false
    // }, 1500)
  }

  return {
    tableProps,
    tableRef,
    extRef,
    loadData,
    formState,
    formRef,
    formData,
    showForm
  }
}
