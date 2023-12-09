import { IFormData } from '@/components/ext/types'
import { BaseModel } from '@/hooks/useModel'

export class BaseApi {
  protected static module = ''
  protected modelPath = ''
  constructor() {}
}

export class ModelApi<T extends BaseModel> extends BaseApi {
  @Api.Get()
  declare page: HttpRequest<PageData<T>>

  @Api.Get('/{id}')
  declare info: HttpRequest<T, DataIdParam>

  @Api.Put()
  declare update: HttpRequest<string, IFormData<T>>

  @Api.Post()
  declare save: HttpRequest<string, IFormData<T>>

  @Api.Delete('/{id}')
  declare delete: HttpRequest<string, DataIdParam>

  @Api.Delete('/batch')
  declare batchDelete: HttpRequest<string, { ids: string }>

  constructor(modelPath: string) {
    super()
    super.modelPath = modelPath
  }
}

export const useModelApi = <T extends BaseModel>(modelPath: string) => {
  return new ModelApi<T>(modelPath)
}
