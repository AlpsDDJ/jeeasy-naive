import { IFormData } from '@/components/ext/types'
import { BaseModel } from '@/hooks/useModel'

export class BaseApi {
  protected static module = ''
  protected modelPath = ''
  constructor() {}
}

export class ModelApi<T extends BaseModel> extends BaseApi {
  @Get()
  declare page: HttpRequest<PageData<T>>

  @Get('/{id}')
  declare info: HttpRequest<T, DataIdParam>

  @Put()
  declare update: HttpRequest<string, IFormData<T>>

  @Post()
  declare save: HttpRequest<string, IFormData<T>>

  @Delete('/{id}')
  declare delete: HttpRequest<string, DataIdParam>

  @Delete('/batch')
  declare batchDelete: HttpRequest<string, { ids: string }>

  constructor(modelPath: string) {
    super()
    super.modelPath = modelPath
  }
}

export const useModelApi = <T extends BaseModel>(modelPath: string) => {
  return new ModelApi<T>(modelPath)
}
