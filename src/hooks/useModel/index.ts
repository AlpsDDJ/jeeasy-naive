import Model from './decorator/model'
import Field from './decorator/field'
import { cloneDeep } from 'lodash'

const useModel = <T extends BaseModel>(instance: BaseModelConstructor<T>) => {
  return reactive<ModelState<T>>(cloneDeep(instance.state) as ModelState<T>)
}

type BaseModelConstructor<T> = typeof BaseModel & { new (...args: any[]): T }

const defaultModelState = { keys: {}, labels: {}, api: '', name: '', perms: '', fields: {} }

abstract class BaseModel implements IBaseModel {
  constructor() {}

  @Field.Hidden()
  @Field(['ID'])
  id?: string
  @Field.Hidden()
  @Field(['创建时间'])
  createTime?: string
  @Field.Hidden()
  @Field(['更新时间'])
  updateTime?: string

  static state: ModelState<BaseModel> = cloneDeep(defaultModelState)
}

export { useModel, Model, Field, BaseModel }
