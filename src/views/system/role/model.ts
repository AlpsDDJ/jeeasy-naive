// import { BaseModel } from '@/hooks/useModel'
// import Field from '../../../hooks/useModel/decorator/field'

// @Model.Api('sys/role')
// @Model.Perms('sys:role')
import { FormDataType } from '@/enums/EEnum'

@Model('SysRole')
class SysRole extends BaseModel {
  @Field('角色名称')
  roleName?: string

  @Field('角色标识')
  roleCode?: string

  @Field('启用标记')
  @Field.DataType(FormDataType.NUMBER)
  enableFlag?: number

  @Field('描述')
  description?: string

  @Field('备注')
  remark?: string

  @Field('排序')
  @Field.Hidden()
  // @Field.Hidden()
  sortNo?: string
}

export default SysRole
