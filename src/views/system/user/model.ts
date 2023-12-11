import { FormDataType, InputType } from '@/enums/EEnum'

@Model()
class SysUser extends BaseModel {
  @Field('用户名', { booleanFlags: ['sorter'] })
  username?: String

  @Field('用户编号')
  // @DataType(FormDataType.NUMBER)
  userNo?: string

  @Field('密码')
  @Hidden(['list', 'query'])
  password?: string

  @Field('手机号')
  phone?: string

  @Field('姓名')
  realName?: string

  @Field('性别', { dict: 'Sex' })
  @Dict('Sex')
  @DataType(FormDataType.NUMBER)
  sex?: number

  @Field('生日')
  @DataType(FormDataType.DATE)
  birthday?: string

  @Field('邮箱')
  email?: string

  @Field('头像')
  avatar?: string

  @Field('角色', { render: ({ roles }) => roles?.map?.(({ roleName }) => roleName)?.join(','), formSpan: 2 })
  @DataType(FormDataType.ARRAY)
  @Dict('#sys_role')
  roles?: string[]

  @Field('部门', {
    render: ({ depts }) => depts?.map?.(({ deptName }) => deptName)?.join(','),
    formSpan: 2,
    inputProps: { topPid: '0', async: false }
  })
  @DataType(FormDataType.ARRAY, InputType.TREE_SELECT)
  @Dict('#sys_dept')
  depts?: string[]

  @Field('状态')
  @Dict('SysUserStatus')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  status?: number
}

export default SysUser
