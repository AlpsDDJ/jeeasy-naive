import { FormDataType, InputType } from '@/enums/EEnum'
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
  @Hidden()
  // @Hidden()
  sortNo?: string

  @Field('备注')
  remark?: string

  @Field('启用标记')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Dict()
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

@Server('/sys/role/')
export class SysRoleApi extends BaseApi {
  @Get('permissions/{id}')
  static getRolePermission: HttpRequest<RolePermission[], DataIdParam>

  @Post('permissions')
  static saveRolePermission: HttpRequest<string, SaveRolePermissionParams>
}
