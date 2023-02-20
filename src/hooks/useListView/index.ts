import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'
import { DataTableColumn } from 'naive-ui'
import { renderActions } from '@/hooks/useListView/render/renderActions'

const defaultPage: Page = {
  pageNo: 1,
  pageSize: 10,
  pages: 0,
  total: 0
}
const createDefaultState = <T extends IBaseModel>(): ListView<T> => ({
  records: [],
  loading: false,
  page: defaultPage
})

export const useListView = <T extends BaseModel>(instance: BaseModelConstructor<T>, option: Record<any, any> = {}) => {
  const modelState: ModelState<T> = useModel<T>(instance)
  const { actions } = option
  // const { fields } = modelState

  // const columns = computed(() => {
  //   return Object.values(fields) as DataTableColumn[]
  // })

  if (actions !== false) {
    modelState.fields['acions'] = {
      title: '操作',
      render: (row, index) => renderActions(actions, row, index)
    } as DataTableColumn
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
    loadData,
    columns
    // dataTabelProps
  }
}
