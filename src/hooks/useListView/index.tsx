import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'
import { DataTableColumn, DataTableInst } from 'naive-ui'
import ActionColumn from '@/components/TableExt/components/ActionColumn.vue'
import { h } from 'vue'

const defaultPage: Page = {
  pageNo: 1,
  pageSize: 10,
  pages: 0,
  total: 0
}

export const useListView = <T extends BaseModel>(instance: BaseModelConstructor<T>, option: Record<any, any> = {}) => {
  const createDefaultState = <T extends IBaseModel>(): ListView<T> => ({
    records: [],
    loading: false,
    page: defaultPage
  })
  const tableRef = ref<DataTableInst>()

  const modelState: ModelState<T> = useModel<T>(instance)
  const { actions } = option
  // const { fields } = modelState

  // const columns = computed(() => {
  //   return Object.values(fields) as DataTableColumn[]
  // })
  const handleDelete = (row, index) => {
    console.log(`删除第${index} 行，id = ${row.id}`)
  }
  const handleEdit = (row, index) => {
    console.log(`编辑第${index} 行，id = ${row.id}`)
  }
  // const actionHandles = {
  //   'action:delete': handleDelete,
  //   'action:edit': handleEdit
  // }

  if (actions !== false) {
    modelState.fields['acions'] = {
      title: '操作',
      key: 'action'
    } as DataTableColumn
    if (actions === 'default') {
      modelState.fields['actions'].render = (row, index) => (
        <ActionColumn
          actions={actions}
          row={row}
          index={index}
          onAction:edit={handleEdit}
          onAction:delete={handleDelete}
        ></ActionColumn>
      )
    }
  }

  const fields = reactive(modelState.fields)

  // function updateField(newFields: { [key: string]: FieldOption<T> | () => FieldOption<T> }) {
  //
  // }
  // // console.log('fields uname ---> ', toRaw(fields.username))
  // fields['username'].label = 'UName'
  // console.log('fields uname  222 ---> ', toRaw(fields.username))

  const columns = computed(() => Object.values(fields).filter(({ hidden }) => !hidden))

  // const dataTabelProps = {
  //   columns
  // }

  const defaultState = createDefaultState()

  const listState = reactive(defaultState)

  function loadData() {
    listState.loading = true
    setTimeout(() => {
      const total = 7
      listState.page = { ...listState.page, total, pages: 1 }
      listState.records = []
      let index = 0
      while (index++ < total) {
        const record = reactive({
          id: `${index}`,
          username: `user ${index}`,
          userNo: `NO.${index}`,
          age: 20 + index * 2
        } as BaseModel)
        listState.records.push(record)
      }
      listState.loading = false
    }, 500)
  }

  const formRef = ref()

  const formState = reactive({
    showForm: false
  })

  onMounted(() => {
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
    listState,
    tableRef,
    loadData,
    columns,
    formState,
    formRef
    // dataTabelProps
  }
}
