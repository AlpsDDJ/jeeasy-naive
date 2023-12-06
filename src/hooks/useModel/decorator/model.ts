import { cloneDeep, snakeCase } from 'lodash-es'

type ModelParams<T extends IBaseModel> = Partial<Omit<ModelState<T>, 'keys'>>

const Model = <T extends InternalRowData>(parmas?: DataKey | ModelParams<T>) => {
  const classDecorator: ClassDecorator = <T extends Function>(constructor: T): T => {
    console.log('constructor.name --> ', constructor.name)
    if (!parmas) {
      parmas = constructor.name
    }
    if (typeof parmas === 'string' || typeof parmas === 'symbol') {
      const snakeCaseName = snakeCase(parmas.toString())
      return setModelState(constructor, {
        name: parmas.toString(),
        perms: snakeCaseName.replace(/_+/g, ':'),
        api: snakeCaseName.replace(/_+/g, '/')
      })
    } else {
      return setModelState(constructor, parmas as ModelParams<T>)
    }
  }
  return classDecorator
}

Model.Api = (api: string) => {
  return <T extends Function>(constructor: T) => {
    return setModelState(constructor, { api })
  }
}

Model.Perms = (perms: string) => {
  return <T extends Function>(constructor: T) => {
    return setModelState(constructor, { perms })
  }
}

function setModelState<T extends Function>(constructor: T, state: ModelParams<T>) {
  const modelName = state.name || constructor.name
  constructor['state'] = cloneDeep({ ...constructor['state'], ...state, name: modelName }) as ModelState<T>
  return constructor
}

export default Model
