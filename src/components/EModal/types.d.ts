import { ButtonActions } from '@/components/ActionButton/commonActions'

export type EModalProps = {
  type?: 'modal' | 'drawer'
  title?: string
  actions?: ButtonActions
  width?: string | number
}
