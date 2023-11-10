import { ExtFormItem } from '@/components/ext/types'
import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'

declare global {
  interface IBaseModel extends InternalRowData {
    id?: string
  }

  type ModelStateRequiredAttr<T extends IBaseModel, P> = { [key in keyof Required<T>]: P } | Record<string, P>
  type ModelStatePartialAttr<T extends IBaseModel, P> = { [key in keyof Partial<T>]: P } | Record<string, P>

  // type ModelLabel<T extends IBaseModel> = ModelStateRequiredAttr<T, string>
  type ModelField<T extends IBaseModel> = ModelStateRequiredAttr<T, string>

  type ModelState<T extends IBaseModel> = {
    keys: ModelField<T>
    // labels: ModelLabel<T>
    name: string
    desc?: string
    api: string
    perms: string | boolean

    fields: ModelStatePartialAttr<T, FieldOption<T>>
    // columns: FieldOption<T>
  }

  // type FieldOpt<T extends InternalRowData> = ExtFormItem<T> & {
  //   label?: string
  //   hidden?: boolean | ['edit' | 'add' | 'view' | 'list' | 'query']
  //   $type$?: T
  // }
  type FieldHiddenType = true | ['list' | 'form' | 'query' | 'edit' | 'add' | 'view']
  type FieldOption<T extends InternalRowData> = TableBaseColumn<T> &
    (ExtFormItem<T> & {
      label?: string
      hidden?: FieldHiddenType
      $type$?: T
    })
  // type FieldOption<T extends InternalRowData> = FieldOpt<T> & DataTableColumn<T>

  type FieldOptionFlag = string | 'hidden' | 'dict'

  type FieldDecoratorType = <T extends InternalRowData>(label?: string | FieldOption<T>, option?: FieldOptionFlag[] | FieldOption<T>) => PropertyDecorator
}

export default {}
