import { BaseModel, Model, Field } from '@/hooks/useModel'

// @Model({
//   api: 'sys/user',
//   name: 'SysUser',
//   perms: 'sys:user'
// })
@Model.Api('sys/sys/user')
@Model.Perms('sys:user')
export class User extends BaseModel {
  @Field(['编号'])
  userNo?: number

  @Field<User>(['用户名', { sorter: 'default' }])
  username?: string

  @Field()
  password?: string

  @Field([{ label: '年龄' }])
  age?: number

  @Field([{ label: '手机号' }])
  phone?: string
  @Field([{ label: '姓名' }])
  realName?: string

  @Field([{ label: '性别' }])
  sex?: number
  @Field([{ label: '生日' }])
  birthday?: string
  @Field([{ label: '状态' }])
  status?: number
  @Field([{ label: '邮箱' }])
  email?: number
  @Field([{ label: '头像' }])
  avatar?: number
}
