import { DataTableColumn } from 'naive-ui'

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

  type FieldOpt<T extends InternalRowData> = {
    label?: string
    hidden?: boolean
    $type$?: T
  }

  type FieldOption<T extends InternalRowData> = FieldOpt | DataTableColumn<T>

  type FieldOptionFlag = string | 'hidden' | 'dict'

  type FieldDecoratorType = <T extends InternalRowData>(
    label?: string | FieldOption<T>,
    option?: FieldOptionFlag[] | FieldOption<T>
  ) => PropertyDecorator
}

export default {}
