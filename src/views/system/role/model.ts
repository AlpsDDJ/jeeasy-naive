// import { BaseModel } from '@/hooks/useModel'
// import Field from '../../../hooks/useModel/decorator/field'

// @Model.Api('sys/role')
// @Model.Perms('sys:role')
import { FormDataType } from '@/enums/EEnum'
import { BaseApi } from '@/hooks/useApi'

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
  @Field.DataType(FormDataType.NUMBER)
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

@Api('/sys/role/')
export class SysRoleApi extends BaseApi {
  @Api.Get('permissions/{id}')
  static getRolePermission: HttpRequest<RolePermission[], { id: string }>

  @Api.Post('permissions')
  static saveRolePermission: HttpRequest<string, SaveRolePermissionParams>
}
