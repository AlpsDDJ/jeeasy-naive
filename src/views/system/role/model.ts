import { BaseApi } from '@/hooks/useApi'

import { Axios, Field, FormDataTypeEnum, Get, InputTypeEnum, Model, Post } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model('SysRole')
export default class SysRole extends BaseModel {
  @Field('角色名称')
  roleName?: string

  @Field('角色标识')
  roleCode?: string

  @Field('描述')
  description?: string

  @Field('排序')
  @Field.Hidden()
  // @Field.Hidden()
  sortNo?: string

  @Field('备注')
  remark?: string

  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict()
  enableFlag?: number
}

export type RolePermission = {
  id: string
  name: string
  roleId: string
}

export type SaveRolePermissionParams = {
  roleId: string
  permissions: string[]
}

@Axios('/sys/role/')
export class SysRoleApi extends BaseApi {
  @Get('permissions/{id}')
  static getRolePermission: HttpRequest<RolePermission[], DataIdParam>

  @Post('permissions')
  static saveRolePermission: HttpRequest<string, SaveRolePermissionParams>
}
