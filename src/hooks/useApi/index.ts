export class BaseApi {
  protected static module = ''
  protected modelPath = ''
  constructor() {}
}

export class ModelApi<T = any> extends BaseApi {
  @Api.Get()
  declare page: HttpRequest<PageData<T>>

  @Api.Get('/{id}')
  declare info: HttpRequest

  @Api.Put()
  declare update: HttpRequest

  @Api.Post()
  declare save: HttpRequest

  @Api.Delete()
  declare delete: HttpRequest

  constructor(modelPath: string) {
    super()
    super.modelPath = modelPath
  }
}

const useModelApi = <T = any>(modelPath: string) => {
  return new ModelApi<T>(modelPath)
}

export { useModelApi }
