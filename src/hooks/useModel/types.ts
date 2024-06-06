import { FieldOption } from 'easy-descriptor'
import { TableColumn, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'

export type EzFieldOption = FieldOption &
  Omit<TableColumn, 'key' | 'type'> & {
    path?: string
    key?: DataKey
    type?: TableSelectionColumn['type'] | TableExpandColumn['type'] | never
    test2?: number
  }
