import { ButtonProps } from 'naive-ui'

// type ButonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
export type ActionType = 'edit' | 'delete' | 'view' | 'add' | string

export type ColAttrFn<T> = ((data: any) => T) | T

export type ActionButtonProps = {
  actions?: ActionOption[] | ActionType[] | boolean | 'default'
  data?: any
  align?: 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start'
  // index: number
}

export type ActionOption = ButtonProps & {
  action: ActionType
  html: string
  handle?: (data: any) => void
  // btnType?: ButonType
  // btnStyle?: 'button' | 'link'
  icon?: string
  autoShow?: boolean
  isDisabled?: ColAttrFn<boolean>
  show?: ColAttrFn<boolean>
}

export const commonActions: ActionOption[] = [
  {
    action: 'query',
    html: '查询',
    secondary: true,
    type: 'primary'
  },
  {
    action: 'reset',
    html: '重置',
    secondary: true,
    type: 'tertiary'
  },
  {
    action: 'add',
    html: '添加',
    secondary: true,
    type: 'primary'
  },
  {
    action: 'edit',
    html: '修改',
    text: true,
    type: 'primary',
    isDisabled: true,
    autoShow: true
    // handle: (row, index) => {
    //   console.log(`action edit row${index}:`, row)
    // }
  },
  {
    action: 'delete',
    html: '删除',
    text: true,
    type: 'error',
    autoShow: true
    // handle: (row, index) => {
    //   console.log(`action delete row${index}:`, row)
    // }
  },
  {
    action: 'view',
    html: '查看',
    text: true,
    type: 'primary',
    autoShow: false
    // handle: (row, index) => {
    //   console.log(`action edit row${index}:`, row)
    // }
  }
]
