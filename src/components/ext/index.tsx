import { BaseModel } from '@/hooks/useModel'
import { ExtTableInst, ExtFormInst, IFormData, ExtView, IFormType } from '@/components/ext/types'

export const useExtView = <T extends BaseModel>(): ExtView<T> => {
  // const tableRef = ref<DataTableInst>()
  const tableRef = ref<ExtTableInst<T>>()
  const formRef = ref<ExtFormInst<T>>()
  const formData = ref<IFormData<T>>()

  const loadData = (params?: any) => {
    return tableRef.value!.loadData(params)
  }

  const showForm = (type: IFormType, formData?: any) => {
    formRef.value!.open(type, formData)
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
