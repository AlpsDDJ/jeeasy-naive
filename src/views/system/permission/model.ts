import { FormDataType, InputType } from '@/enums/EEnum'

@Model({
  name: 'SysPermission',
  tree: true
})
export default class SysPermission extends BaseModel {
  @Field('资源名称')
  name?: string

  @Field('上级菜单', { inputProps: { topPid: '0', async: false } })
  @Field.Hidden(['list'])
  @Field.Dict('#sys_permission')
  @Field.DataType(FormDataType.STRING, InputType.TREE_SELECT)
  parentId?: string

  @Field('路径')
  path?: string

  @Field('权限编码')
  perms?: string

  @Field('菜单图标')
  icon?: number

  @Field('组件')
  component?: string

  @Field('组件名称')
  @Field.Hidden(['list'])
  componentName?: string

  @Field('一级菜单路由地址')
  @Field.Hidden()
  redirect?: string

  @Field('菜单类型')
  @Field.Dict()
  @Field.DataType(FormDataType.NUMBER)
  menuType?: number

  @Field('权限策略')
  @Field.Dict()
  @Field.DataType(FormDataType.NUMBER)
  permsType?: number

  @Field('聚合子路由')
  @Field.Dict('boolean')
  @Field.Hidden(['list'])
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  alwaysShow?: number

  @Field('路由菜单')
  @Field.Dict('boolean')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  route?: number

  @Field('叶子节点')
  @Field.Dict('boolean')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Field.Hidden()
  leaf?: number

  @Field('缓存页面')
  @Field.Dict('boolean')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  keepAlive?: number

  @Field('隐藏路由')
  @Field.Dict('boolean')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  hidden?: number

  @Field('添加数据权限')
  @Field.Dict('boolean')
  @Field.Hidden(['list'])
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  ruleFlag?: number

  @Field('外链打开方式')
  @Field.Dict('LinkOpenType')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataType.NUMBER)
  internalOrExternal?: number

  @Field('菜单排序')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataType.NUMBER)
  sortNo?: number

  @Field('描述', { formSpan: 3 })
  @Field.Hidden(['list', 'query'])
  @Field.DataType(FormDataType.STRING, InputType.TEXT_AREA)
  description?: string

  @Field('启用标记')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Field.Dict()
  enableFlag?: number
}

// export default SysPermission
