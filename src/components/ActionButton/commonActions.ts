import { ButtonProps } from 'naive-ui'

// type ButonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
export type ActionType = 'edit' | 'delete' | 'view' | 'add' | string

export type ColAttrFn<T> = ((data: any) => T) | T

export type ButtonActions = (ActionOption | ActionType)[] | boolean | 'default'

export type ActionButtonProps = {
  actions?: ButtonActions
  data?: any
  align?: 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start'
  icon?: string
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
    icon: 'Search',
    secondary: true,
    type: 'primary'
  },
  {
    action: 'reset',
    html: '重置',
    icon: 'Reload',
    secondary: true,
    type: 'tertiary'
  },
  {
    action: 'add',
    html: '添加',
    icon: 'Add',
    secondary: true,
    type: 'primary'
  },
  {
    action: 'edit',
    html: '编辑',
    text: true,
    icon: 'antd:EditTwotone',
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
    icon: 'TrashOutline',
    type: 'error',
    autoShow: true
    // handle: (row, index) => {
    //   console.log(`action delete row${index}:`, row)
    // }
  },
  {
    action: 'view',
    html: '查看',
    icon: 'EyeOutline',
    text: true,
    type: 'primary',
    autoShow: false
    // handle: (row, index) => {
    //   console.log(`action edit row${index}:`, row)
    // }
  }
]
