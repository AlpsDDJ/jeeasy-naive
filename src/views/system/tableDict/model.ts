import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

/**
 * 数据表字典
 */
@Model('SysTableDict')
export default class SysTableDict extends BaseModel {
  /**
   * 版本
   */
  @Field('版本')
  @Field.Hidden()
  @Field.DataType(FormDataTypeEnum.STRING)
  version?: string
  /**
   * 启用标记
   */
  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.STRING)
  enableFlag?: string
  /**
   * 字典编码
   */
  @Field('字典编码')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  dictCode?: string
  /**
   * 字典名称
   */
  @Field('字典名称')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  dictName?: string
  /**
   * 查询表名
   */
  @Field('查询表名')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  tableName?: string
  /**
   * 数据源名称
   */
  @Field('数据源名称')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  databaseName?: string
  /**
   * 值字段
   */
  @Field('值字段')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  valueColumn?: string
  /**
   * 名称字段
   */
  @Field('名称字段')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  nameColumn?: string
  /**
   * 是否为树表
   */
  @Field('是否为树表')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.SWITCH)
  isTree?: string
  /**
   * 父级字段名称
   */
  @Field('父级字段名称')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  parentId?: string
  /**
   * 是否为叶子节点
   */
  @Field('是否为叶子节点')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT)
  leafColumn?: string
}
