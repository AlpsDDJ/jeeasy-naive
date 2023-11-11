// import { BaseModel } from '@/hooks/useModel'
// import Field from '@/hooks/useModel/decorator/field'

// @Model({
//   api: 'sys/user',
//   name: 'SysUser',
//   perms: 'sys:user'
// })
// @Model.Api('sys/user')
// @Model.Perms('sys:user')

import { FormDataType } from '@/enums/ExtEnum'

@Model('SysUser')
class SysUser extends BaseModel {
  @Field('用户名', { booleanFlags: ['sorter'] })
  username?: String

  @Field('用户编号')
  @Field.DataType(FormDataType.NUMBER)
  userNo?: number

  @Field('密码')
  @Field.Hidden()
  password?: string

  @Field('年龄')
  @Field.Hidden(['form'])
  @Field.DataType(FormDataType.NUMBER)
  age?: number

  @Field('手机号')
  phone?: string

  @Field('姓名')
  realName?: string

  @Field('性别')
  @Field.DataType(FormDataType.NUMBER)
  sex?: number

  @Field('生日', { inputProps: { ['value-format']: 'yyyy-MM-dd' } })
  @Field.DataType(FormDataType.DATE)
  birthday?: string

  @Field('状态')
  @Field.DataType(FormDataType.NUMBER)
  status?: number

  @Field('邮箱')
  email?: string

  @Field('头像')
  avatar?: string
}

export default SysUser
