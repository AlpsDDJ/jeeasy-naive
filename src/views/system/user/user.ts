import { BaseModel, Model, Field } from '@/hooks/useModel'

@Model()
export class User extends BaseModel {
  @Field(['用户名', { field: 'uname' }])
  username?: string
  @Field(['密码'])
  password?: string
  @Field([{ label: '年龄' }])
  age?: number
}
