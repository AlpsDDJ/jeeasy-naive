import { Api, Field, Get, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'
import { BaseApi } from '@/hooks/useApi'

@Model()
export default class GenModule extends BaseModel {
  @Field('模块名称')
  name?: string

  @Field('模块编码')
  moduleCode?: string

  @Field('包名', {
    formSpan: 2
  })
  pkg?: string

  @Field('Entity 包名')
  entity?: string

  @Field('Mapper 包名')
  mapper?: string

  @Field('Xml 包名')
  mapperXml?: string

  @Field('Service 包名')
  service?: string

  @Field('ServiceImpl 包名')
  serviceImpl?: string

  @Field('Controller 包名')
  controller?: string

  @Field('webList 路径')
  webList?: string

  @Field('webModel 路径')
  webModel?: string

  files?: string[]
}

@Api('/gen/module/')
export class GenModuleApi extends BaseApi {
  @Get('findByCode/{code}')
  static getModule: HttpRequest<GenModule, { code: string }>
}

export type GeneratorFile = {
  type?: string
  pkg?: string
  path?: string
  template?: string
  className?: string
  outputName?: string
}

// @Model()
export type GeneratorData = {
  tableId?: string
  files?: GeneratorFile[]
}
