import { BaseModel, Model, Field } from '@/hooks/useModel'

// @Model({
//   api: 'sys/user',
//   name: 'SysUser',
//   perms: 'sys:user'
// })
@Model.Api('sys/user')
@Model.Perms('sys:user')
export class User extends BaseModel {
  @Field<User>(['用户名', { sorter: 'default' }])
  username?: string
  @Field(['编号'])
  userNo?: number
  @Field()
  password?: string
  @Field([{ label: '年龄' }])
  age?: number
}
