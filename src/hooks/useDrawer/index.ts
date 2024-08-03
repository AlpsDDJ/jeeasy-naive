import { UseDrawer, UseDrawerReturnValue } from '@/hooks/useDrawer/types'

export const useDrawer: UseDrawer = <T = any>(): UseDrawerReturnValue<T> => {
  const data = ref<T>()
  const isShow = ref<boolean>(false)

  const open = (d: T) => {
    isShow.value = true
    data.value = d
  }

  const close = () => {
    isShow.value = false
  }

  return {
    data,
    isShow,
    open,
    close
  }
}
