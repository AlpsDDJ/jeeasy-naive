import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model()
export class SysUser extends BaseModel {
  @Field('用户名', { booleanFlags: ['sorter'] })
  username?: String

  @Field('用户编号')
  // @Field.DataType(FormDataTypeEnum.NUMBER)
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
  @Field.DataType(FormDataTypeEnum.NUMBER)
  sex?: number

  @Field('生日')
  @Field.DataType(FormDataTypeEnum.DATE)
  birthday?: string

  @Field('邮箱')
  email?: string

  @Field('头像')
  avatar?: string

  @Field('角色', { render: ({ roles }) => roles?.map?.(({ roleName }) => roleName)?.join(','), formSpan: 2 })
  @Field.DataType(FormDataTypeEnum.ARRAY)
  @Field.Dict('#sys_role')
  roles?: string[]

  @Field('部门', {
    render: ({ depts }) => depts?.map?.(({ deptName }) => deptName)?.join(','),
    formSpan: 2,
    inputProps: { topPid: '0', async: false }
  })
  @Field.DataType(FormDataTypeEnum.ARRAY, InputTypeEnum.TREE_SELECT)
  @Field.Dict('#sys_dept')
  depts?: string[]

  @Field('状态')
  @Field.Dict('SysUserStatus')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  status?: number
}

// export default SysUser
