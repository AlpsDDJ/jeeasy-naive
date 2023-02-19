import { BaseModel, BaseModelConstructor } from '@/hooks/useModel'

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
  console.log(option)
  const modelState = instance.state as ModelState<T>
  const { api } = modelState
  console.log(api)

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
        const record = reactive({ username: `user ${index}`, userNo: `NO.${index}`, age: 20 + index * 2 } as BaseModel)
        listState.records.push(record)
      }
      listState.loading = false
    }, 500)
  }

  onMounted(() => {
    loadData()
  })

  return {
    listState,
    loadData
  }
}
