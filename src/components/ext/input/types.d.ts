export type DictInputProps = {
  code: string
  multiple?: boolean
  component?: 'select' | 'treeSelect' | 'checkbox' | 'radio' | 'switch' | 'tree'
  showSwitchText?: boolean
  topPid?: string | number
  async?: boolean
  queryParams?: Record<string, any>
}

export type DictData = {
  dictCode: string
  dictName: string
  leaf?: number
  children?: DictData[]
}

export type DictInputValues = string | string[] | number | number[]
