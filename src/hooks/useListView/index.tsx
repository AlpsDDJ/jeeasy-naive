import { BaseModel } from '@/hooks/useModel'
import { ExtTableInst } from '@/components/ext/types'

export const useListView = <T extends BaseModel>() => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ExtTableInst<T>>()
  const formRef = ref<ExtFormInst<T>>()
  const formData = ref<IFormData<T>>()

  const loadData = (params?: any) => {
    tableRef.value?.loadData(params)
  }

  const showForm = (type: IFormType, formData?: any) => {
    formRef.value?.show(type, formData)
  }

  return {
    tableRef,
    formRef,
    formData,
    loadData,
    showForm
    // showForm
  }
}
