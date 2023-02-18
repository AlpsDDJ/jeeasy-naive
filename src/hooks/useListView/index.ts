const defaultPage: Page = {
  pageNo: 1,
  pageSize: 10,
  pages: 0,
  total: 0
}
const createDefaultState = <T extends IBaseModel>(): ListView<T> => ({
  records: [],
  page: defaultPage
})

export const useListView = <T extends IBaseModel>() => {
  // console.log(modelClass)
  const listState = reactive<ListView<T>>(createDefaultState())

  return {
    listState
  }
}
