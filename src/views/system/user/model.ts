// import { BaseModel } from '@/hooks/useModel'
// import Field from '@/hooks/useModel/decorator/field'

// @Model({
//   api: 'sys/user',
//   name: 'SysUser',
//   perms: 'sys:user'
// })
// @Model.Api('sys/user')
// @Model.Perms('sys:user')

import { FormDataType, InputType } from '@/enums/EEnum'

@Model()
class SysUser extends BaseModel {
  @Field('用户名', { booleanFlags: ['sorter'] })
  username?: String

  @Field('用户编号')
  // @Field.DataType(FormDataType.NUMBER)
  userNo?: string

  @Field('密码')
  @Field.Hidden(['list', 'query'])
  password?: string

  @Field('手机号')
  phone?: string

  @Field('姓名')
  realName?: string

  @Field('性别', { dict: 'Sex' })
  @Field.Dict('Sex')
  @Field.DataType(FormDataType.NUMBER)
  sex?: number

  @Field('生日')
  @Field.DataType(FormDataType.DATE)
  birthday?: string

  @Field('邮箱')
  email?: string

  @Field('头像')
  avatar?: string

  @Field('角色', { render: ({ roles }) => roles?.map?.(({ roleName }) => roleName)?.join(','), formSpan: 2 })
  @Field.DataType(FormDataType.ARRAY)
  @Field.Dict('#sys_role')
  roles?: string[]

  @Field('部门', {
    render: ({ depts }) => depts?.map?.(({ deptName }) => deptName)?.join(','),
    formSpan: 2,
    inputProps: { topPid: '0', async: false }
  })
  @Field.DataType(FormDataType.ARRAY, InputType.TREE_SELECT)
  @Field.Dict('#sys_dept')
  depts?: string[]

  @Field('状态')
  @Field.Dict('SysUserStatus')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  status?: number
}

export default SysUser
