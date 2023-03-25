export class BaseApi {
  protected static module = ''
  protected modelPath = ''
  constructor() {}
}

export class ModelApi extends BaseApi {
  @Api.Get()
  declare page: HttpRequest

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

const useModelApi = (modelPath: string) => {
  return new ModelApi(modelPath)
}

export { useModelApi }
