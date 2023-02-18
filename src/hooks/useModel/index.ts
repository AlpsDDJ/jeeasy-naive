import Model from './decorator/model'
import Field from './decorator/field'

const useModel = <T extends BaseModel>(instance: BaseModelConstructor<T>) => {
  // const _instance = instance as BaseModel
  // _instance.
  return reactive<ModelState<T>>({
    field: { ...instance.field } as ModelField<T>,
    label: { ...instance.label } as ModelLabel<T>
  })
}

abstract class BaseModel implements IBaseModel {
  constructor() {}

  id?: string
  createTime?: string
  updateTime?: string

  static label: ModelLabel<BaseModel>
  static field: ModelField<BaseModel>
}

export { useModel, Model, Field, BaseModel }
