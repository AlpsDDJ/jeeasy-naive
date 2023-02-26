import { h } from 'vue'
import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'
import { DataTableColumn, DataTableInst, PaginationProps } from 'naive-ui'
import ActionColumn from '@/components/ExtTable/components/ActionColumn.vue'

export const useListView = <T extends BaseModel>(instance: BaseModelConstructor<T>, option: Record<any, any> = {}) => {
  const defaultPage: PaginationProps = {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    itemCount: 0
  }
  const createDefaultState = <T extends IBaseModel>(): ListView<T> => ({
    records: [],
    loading: false,
    pagination: { ...defaultPage },
    onUpdatePagination: (page) => {
      console.log('page -------------- ', page)
      loadData()
    }
  })
  const tableRef = ref<DataTableInst>()
  const extRef = ref()

  const modelState: ModelState<T> = useModel<T>(instance)
  const { actions = 'default' } = option
  // const { fields } = modelState

  // const columns = computed(() => {
  //   return Object.values(fields) as DataTableColumn[]
  // })
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

  // type FormShowType = EnumTypes<FormShowTypeEnum>

  // const formActive = ref(false)

  const showForm = (formData: any, type: EnumTypes<FormType>) => {
    formState.active = true
    // console.log(formData)
    console.log('FormShowType ---> ', type)
    console.log('FormShowType ---> ', type === FormType.ADD)
  }
  // const actionHandles = {
  //   'action:delete': handleDelete,
  //   'action:edit': handleEdit
  // }

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

  const columns = computed(() => Object.values(fields).filter(({ hidden }) => !hidden))

  const defaultState = createDefaultState()

  const listState = reactive(defaultState)

  watch(listState.pagination, () => {
    console.log('listState.page ---> ', listState.pagination)
    loadData()
  })

  // const columns = computed(() => Object.values(fields).filter(({ hidden }) => !hidden))

  const tableProps = {
    // columns: Object.values(fields).filter(({ hidden }) => !hidden),
    pagination: listState.pagination,
    data: listState.records,
    loading: listState.loading,
    onUpdatePagination: listState.onUpdatePagination
  }

  function loadData() {
    console.log('loadData ==> ', listState.pagination)
    listState.loading = true
    setTimeout(() => {
      const itemCount = 17
      listState.pagination = { ...listState.pagination, itemCount }
      listState.records = []
      let index = 0
      while (index++ < itemCount) {
        const record = reactive({
          id: `${index}`,
          username: `user ${index}`,
          userNo: `NO.${index}`,
          age: 20 + index * 2
        } as BaseModel)
        listState.records.push(record)
      }
      console.log('listState.records --- ', listState.records)
      listState.loading = false
    }, 1500)
  }

  const formRef = ref()

  const formState = reactive({
    active: false
  })

  onMounted(() => {
    // showForm({}, FormType.ADD)
    tableRef.value = extRef.value!.tableRef
    loadData()
    setTimeout(() => {
      // columns[0].username = 'new username'
      // console.log('fields.username  ---- ', fields.username)
      // fields.username = { ...fields[0].username, label: 'new username' }
      // fields['username'].title = 'UName'
      // console.log(222)
    }, 1500)
  })

  return {
    tableProps,
    tableRef,
    columns,
    extRef,
    loadData,
    formState,
    formRef,
    showForm
    // dataTabelProps
  }
}
