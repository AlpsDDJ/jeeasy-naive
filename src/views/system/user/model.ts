// import { BaseModel } from '@/hooks/useModel'

// @Model({
//   api: 'sys/user',
//   name: 'SysUser',
//   perms: 'sys:user'
// })
// @Model.Api('sys/user')
// @Model.Perms('sys:user')

@Model('SysUser')
class SysUser extends BaseModel {
  @Field<SysUser>('用户名', ['sorter'])
  username?: String

  @Field('用户编号')
  userNo?: number

  @Field('密码')
  @FieldHidden()
  password?: string

  @Field('年龄')
  @FieldHidden(['form'])
  age?: number

  @Field('手机号')
  phone?: string

  @Field('姓名')
  realName?: string

  @Field('性别')
  sex?: number

  @Field('生日')
  birthday?: string

  @Field('状态')
  status?: number

  @Field('邮箱')
  email?: number

  @Field('头像')
  avatar?: number
}

export default SysUser
