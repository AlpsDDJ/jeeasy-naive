import { EFormItem, IFormDataType, IInputType } from '@/components/ext/types'
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

  type BooleanFlag = string | 'hidden' | 'dict'
  interface FieldOption<T extends InternalRowData> extends TableBaseColumn<T>, EFormItem<T> {
    label?: string
    hidden?: FieldHiddenType
    dataType?: IFormDataType
    inputType?: IInputType
    inputProps?: Record<string, any>
    queryInputProps?: Record<string, any>
    booleanFlags?: BooleanFlag[]
    dict?: string
    $type$?: T
  }
  // type FieldOption<T extends InternalRowData> = FieldOpt<T> & DataTableColumn<T>

  interface FieldDecoratorType {
    <T extends InternalRowData>(label?: string | Partial<FieldOption<T>>, option?: Partial<FieldOption<T>>): PropertyDecorator
    Dict: (dict?: string) => PropertyDecorator
    Hidden: (hiddenType?: FieldHiddenType) => PropertyDecorator
    DataType: (dataType?: IFormDataType, inputType?: IInputType) => PropertyDecorator
  }
}

export default {}
