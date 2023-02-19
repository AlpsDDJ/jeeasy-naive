type ModelParams<T extends IBaseModel> = Partial<Omit<ModelState<T>, 'labels' | 'keys'>>

const Model = <T extends InternalRowData>(parmas: ModelParams<T> = {}) => {
  const classDecorator: ClassDecorator = <T extends Function>(constructor: T) => {
    return setModelState(constructor, parmas)
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
  constructor['state'] = { ...constructor['state'], ...state, name: modelName } as ModelState<T>
  return constructor
}

export default Model
