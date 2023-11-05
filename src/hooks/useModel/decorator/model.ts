import { cloneDeep, snakeCase } from 'lodash-es'

type ModelParams<T extends IBaseModel> = Partial<Omit<ModelState<T>, 'keys'>>

const Model = <T extends InternalRowData>(parmas: string | ModelParams<T> = {}) => {
  const classDecorator: ClassDecorator = <T extends Function>(constructor: T) => {
    if (typeof parmas === 'string') {
      const snakeCaseName = snakeCase(parmas)
      return setModelState(constructor, {
        name: parmas,
        perms: snakeCaseName.replace(/_+/g, ':'),
        api: snakeCaseName.replace(/_+/g, '/')
      })
    } else {
      return setModelState(constructor, parmas)
    }
  }
  return classDecorator
}

Model.Api = (api: string) => {
  return (<T extends Function>(constructor: T) => {
    return setModelState(constructor, { api })
  }) as ClassDecorator
}

Model.Perms = (perms: string) => {
  return (<T extends Function>(constructor: T) => {
    return setModelState(constructor, { perms })
  }) as ClassDecorator
}

function setModelState<T extends Function>(constructor: T, state: ModelParams<T>) {
  const modelName = state.name || constructor.name
  constructor['state'] = cloneDeep({ ...constructor['state'], ...state, name: modelName }) as ModelState<T>
  return constructor
}

export default Model
