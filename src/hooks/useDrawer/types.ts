import { Ref } from 'vue'

export interface UseDrawerReturnValue<T> {
  data: Ref<T | undefined>
  isShow: Ref<boolean>
  open: (data: T) => void
  close: () => void
}

export interface UseDrawer {
  <T = any>(): UseDrawerReturnValue<T>
}

export type UseDrawerExpose<T> = Pick<UseDrawerReturnValue<T>, 'open' | 'close'>
