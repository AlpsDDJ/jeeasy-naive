import { EFormItem, IFormData, IFormDataType, IFormType, IInputType } from '@/components/ext/types'
import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import { BaseModel } from '@/hooks/useModel'

declare global {
  interface IBaseModel extends InternalRowData {
    id?: string
  }

  type ModelStateRequiredAttr<T extends IBaseModel, P> = { [key in keyof Required<T>]: P } | Record<string, P>
  type ModelStatePartialAttr<T extends IBaseModel, P> = { [key in keyof Partial<T>]: P } | Record<string, P>

  // type ModelLabel<T extends IBaseModel> = ModelStateRequiredAttr<T, string>
  type ModelField<T extends IBaseModel> = ModelStateRequiredAttr<T, string>

  type TreeField<T> = {
    pid?: 'parentId' | keyof ModelField<T>
    children?: 'children' | keyof ModelField<T>
  }

  type ModelState<T extends IBaseModel> = {
    keys: ModelField<T>
    // labels: ModelLabel<T>
    name: string
    desc?: string
    api: string
    perms: string | boolean

    fields: ModelStatePartialAttr<T, FieldOption<T>>
    tree?: true | TreeField<T>
    // pid: keyof ModelField<T> | 'parantId'
    // children: keyof ModelField<T> | 'children'
    // columns: FieldOption<T>
  }

  // type FieldOpt<T extends InternalRowData> = ExtFormItem<T> & {
  //   label?: string
  //   hidden?: boolean | ['edit' | 'add' | 'view' | 'list' | 'query']
  //   $type$?: T
  // }

  type FieldAttrHandler = <T extends BaseModel, P = any>(formData: IFormData<T>, formType?: IFormType) => P

  type FieldHiddenType = boolean | ('list' | 'form' | 'query' | 'edit' | 'add' | 'view')[]
  type FieldDisabledType = boolean | ('form' | 'edit' | 'add' | 'editTable')[]

  type BooleanFlag = string | 'hidden' | 'dict'
  interface FieldOption<T extends InternalRowData> extends TableBaseColumn<T>, EFormItem<T> {
    label?: string
    hidden?: FieldHiddenType
    hiddenHandler?: FieldAttrHandler
    disabled?: FieldDisabledType
    disabledHandler?: FieldAttrHandler
    dataType?: IFormDataType
    inputType?: IInputType
    inputProps?: Record<string, any>
    queryInputProps?: Record<string, any>
    booleanFlags?: BooleanFlag[]
    dict?: string
    formSpan?: number
    $type$?: T
  }
  // type FieldOption<T extends InternalRowData> = FieldOpt<T> & DataTableColumn<T>
  type DictDecoratorType = (dict?: string) => PropertyDecorator
  type HiddenDecoratorType = <T extends BaseModel = BaseModel, P = any>(
    hiddenType?: FieldHiddenType,
    hiddenHandler?: FieldAttrHandler<T, P>
  ) => PropertyDecorator
  type DisabledDecoratorType = <T extends BaseModel = BaseModel, P = any>(
    disabledType?: FieldDisabledType,
    disabledHandler?: FieldAttrHandler<T, P>
  ) => PropertyDecorator
  type DataTypeDecoratorType = (dataType?: IFormDataType, inputType?: IInputType) => PropertyDecorator
  type FieldDecoratorType = <T extends InternalRowData>(label?: string | Partial<FieldOption<T>>, option?: Partial<FieldOption<T>>) => PropertyDecorator
}

export default {}
