// import Model from './decorator/model'
// import Field from './decorator/field'
import { cloneDeep } from 'lodash-es'

const useModel = <T extends BaseModel>(instance: BaseModelConstructor<T>) => {
  return cloneDeep(instance.state) as ModelState<T>
}

// export type BaseModelConstructor<T> = typeof BaseModel & { new (...args: any[]): T }

const defaultModelState = { keys: {}, labels: {}, api: '', name: '', perms: '', fields: {} }

class BaseModel implements IBaseModel {
  constructor() {}

  @Hidden()
  @Field('ID')
  id?: string

  @Hidden()
  @Field('创建时间')
  createTime?: string

  @Hidden()
  @Field('更新时间')
  updateTime?: string

  static state: ModelState<BaseModel> = cloneDeep(defaultModelState)
}

export { useModel, BaseModel }
