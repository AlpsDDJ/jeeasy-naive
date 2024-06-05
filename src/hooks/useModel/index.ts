// import Model from './decorator/model'
// import Field from './decorator/field'
// import { cloneDeep } from 'lodash-es'
import { EzBaseModel, Field, FieldOption } from 'easy-descriptor'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'

// const useModel = <T extends BaseModel>(instance: BaseModelConstructor<T>) => {
//   return cloneDeep(instance.state) as ModelState<T>
// }
type EzFieldOption = FieldOption &
  TableColumn & {
    test2?: number
  }

// export type BaseModelConstructor<T> = typeof BaseModel & { new (...args: any[]): T }

// const defaultModelState = { keys: {}, labels: {}, api: '', name: '', perms: '', fields: {} }

export class BaseModel<T extends BaseModel<T> = BaseModel<any>> extends EzBaseModel<T, EzFieldOption> {
  @Field.Hidden()
  @Field('ID')
  id?: string

  @Field.Hidden()
  @Field('创建时间')
  createTime?: string

  @Field.Hidden()
  @Field('更新时间')
  updateTime?: string

  // static state: ModelState<BaseModel> = cloneDeep(defaultModelState)
}
