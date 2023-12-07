export type DictInputProps = {
  code: string
  multiple?: boolean
  component?: 'select' | 'treeSelect' | 'checkbox' | 'radio' | 'switch'
  showSwitchText?: boolean
}

export type DictInputValues = string | string[] | number | number[]
