export class BaseApi {
  protected static module = ''
  protected modelPath = ''
  constructor() {}
}

export class ModelApi<T = any> extends BaseApi {
  @Api.Get()
  declare page: HttpRequest<PageData<T>>

  @Api.Get('/{id}')
  declare info: HttpRequest<T, DataIdParam>

  @Api.Put()
  declare update: HttpRequest<string, T>

  @Api.Post()
  declare save: HttpRequest<string, T>

  @Api.Delete('/{id}')
  declare delete: HttpRequest<string, DataIdParam>

  @Api.Delete('/batch')
  declare batchDelete: HttpRequest<string, { ids: string }>

  constructor(modelPath: string) {
    super()
    super.modelPath = modelPath
  }
}

export const useModelApi = <T = any>(modelPath: string) => {
  return new ModelApi<T>(modelPath)
}
