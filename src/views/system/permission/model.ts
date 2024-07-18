import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model({
  name: 'SysPermission',
  tree: true
})
export default class SysPermission extends BaseModel {
  @Field<BaseModel>('资源名称', { width: 150 })
  name?: string

  @Field<BaseModel>('上级菜单', { inputProps: { topPid: '0', async: false } })
  @Field.Hidden(['list'])
  @Field.Dict('#sys_permission')
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TREE_SELECT)
  parentId?: string

  @Field('路径')
  path?: string

  @Field('权限编码')
  perms?: string

  @Field('菜单图标')
  @Field.Hidden(['list'])
  icon?: string

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
  @Field.Hidden(['list'])
  @Field.DataType(FormDataTypeEnum.NUMBER)
  menuType?: number

  @Field('权限策略')
  @Field.Dict()
  @Field.DataType(FormDataTypeEnum.NUMBER)
  permsType?: number

  @Field('聚合子路由')
  @Field.Dict('boolean')
  @Field.Hidden(['list'])
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  alwaysShow?: number

  @Field('路由菜单')
  @Field.Dict('boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  route?: number

  @Field('叶子节点')
  @Field.Dict('boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Hidden()
  leaf?: number

  @Field('缓存页面')
  @Field.Dict('boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  keepAlive?: number

  @Field('隐藏路由')
  @Field.Dict('boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  hidden?: number

  // @Field('添加数据权限')
  // @Field.Dict('boolean')
  // @Field.Hidden(['list'])
  // @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  // ruleFlag?: number

  // @Field('外链打开方式')
  // @Field.Dict('LinkOpenType')
  // @Field.Hidden(['query'])
  // @Field.DataType(FormDataTypeEnum.NUMBER)
  // internalOrExternal?: number

  @Field('菜单排序')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.NUMBER)
  sortNo?: number

  @Field('描述', { formSpan: 3 })
  @Field.Hidden(['list', 'query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT_AREA)
  description?: string

  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict()
  enableFlag?: number
}

// export default SysPermission
