import { GeneratorData } from '@/views/gen/module/model'
import type { FieldAttrHandler, HttpRequest } from 'easy-descriptor'
import { Api, Field, FormDataTypeEnum, InputTypeEnum, Model, Post } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

const hiddenIfNotTree: FieldAttrHandler<boolean, GenTable> = (formData) => {
  return !formData.izTree
}

@Model('GenTable')
export default class GenTable extends BaseModel {
  // @Field<BaseModel>('', { type: 'selection', hidden: ['query', 'form'] })
  // selection?: boolean

  @Field()
  $selection?: boolean

  @Field()
  $index?: number

  @Field('表名')
  // @Field.Disabled(['edit'])
  name?: string

  @Field('表摘要')
  summary?: string

  @Field('表描述')
  // @Field.Rule(Rules.username)
  description?: string

  @Field('表类型')
  @Field.Dict('TableType')
  tableType?: string

  @Field('数据源')
  dataSource?: string

  @Field('同步数据库')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  @Field.Hidden(['form'])
  izSync?: number

  @Field('简单查询')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  @Field.Hidden(['list', 'query'])
  izSimpleQuery?: number

  @Field('分页')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  @Field.Hidden(['list', 'query'])
  izPage?: number

  @Field('树形表单')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  izTree?: number

  @Field('树PID')
  @Field.Hidden(['list', 'query'], hiddenIfNotTree)
  // @Field.Hidden(['list', 'query'])
  treePid?: string

  @Field('树名称字段')
  @Field.Hidden(['list', 'query'], hiddenIfNotTree)
  treeNameField?: string

  @Field('表单风格')
  @Field.Dict('TableStyle')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  formType?: number

  @Field('主表')
  @Field.Hidden()
  mainTable?: string

  @Field('从表')
  @Field.Hidden()
  slaveTable?: string

  @Field('主表字段')
  @Field.Hidden()
  mainColumn?: string

  @Field('主表字段code')
  @Field.Hidden()
  mainColumnCode?: string

  @Field('从表字段')
  @Field.Hidden()
  slaveColumn?: string

  @Field('从表字段code')
  @Field.Hidden()
  slaveColumnCode?: string

  @Field('映射关系')
  @Field.Dict('RelationType')
  @Field.Hidden(['list', 'query'], ({ tableType }) => (tableType === 'single') as any)
  relationType?: string

  @Field('子表')
  @Field.Hidden()
  subTableStr?: string

  @Field('附表排序')
  @Field.DataType(FormDataTypeEnum.NUMBER)
  @Field.Hidden()
  tabOrderNum?: number

  /**
   * 表字段列表
   */
  tableFields?: GenTableField[]
  /**
   * 表索引列表
   */
  tableIndexs?: GenTableIndex[]
}
const disableIfId: FieldAttrHandler = ({ columnName }) => columnName === 'id'

/**
 * 数据库属性
 */
@Model('GenTableFieldForDB')
export class GenTableFieldForDB extends BaseModel {
  @Field()
  $selection?: boolean

  @Field()
  $index?: number

  @Field('表ID')
  @Field.Hidden()
  tableId?: string

  @Field('字段名', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  // @Rule(getRules('required'))
  description?: string

  @Field('数据类型', {
    width: 180,
    dict: 'JdbcType',
    inputProps: {
      filterable: true
    }
  })
  @Field.Disabled([], disableIfId)
  jdbcType?: string

  @Field('属性名')
  @Field.Hidden()
  @Field.Disabled([], disableIfId)
  fieldName?: string

  @Field('字段长度', {
    width: 100,
    align: 'center'
  })
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER)
  length?: number

  @Field('小数位', {
    width: 100,
    align: 'center'
  })
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER)
  decimalPlaces?: number

  @Field('默认值', {
    width: 150
  })
  @Field.Disabled([], disableIfId)
  defaultValue?: string

  @Field('主键', {
    width: 100,
    align: 'center',
    dict: 'Boolean'
  })
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  primaryKey?: number

  @Field<BaseModel>('允许空值', {
    width: 100,
    align: 'center'
  })
  @Field.Disabled([], disableIfId)
  @Field.Dict('Boolean')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  allowNull?: number
}

/**
 * 页面属性
 */
@Model('GenTableFieldForPage')
export class GenTableFieldForPage extends BaseModel {
  @Field('表ID')
  @Field.Hidden()
  tableId?: string

  @Field('字段名', {
    width: 180
  })
  @Field.Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Field.Disabled()
  description?: string

  @Field('属性名')
  @Field.Disabled([], disableIfId)
  fieldName?: string

  @Field('java类型')
  @Field.Disabled([], disableIfId)
  javaType?: string

  @Field('页面配置')
  @Field.Hidden()
  viewOptionsJson?: string

  @Field('新增显示', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  showAdd?: number

  @Field('修改显示', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  showEdit?: number

  @Field('列表显示', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  showTable?: number

  @Field('新增时禁用', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  disableOnAdd?: number

  @Field('修改时禁用', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  disableOnEdit?: number

  @Field('行内编辑禁用', {
    width: 120
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  disableOnTableEdit?: number

  @Field('控件类型', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  formType?: string

  @Field('是否查询', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  showSearch?: number

  @Field('搜索类型', {
    width: 180,
    dict: 'SearchType'
  })
  @Field.Disabled([], disableIfId)
  searchType?: string
}

/**
 * 校验属性
 */
@Model('GenTableFieldForRule')
export class GenTableFieldForRule extends BaseModel {
  @Field('表ID')
  @Field.Hidden()
  tableId?: string

  @Field('字段名', {
    width: 180
  })
  @Field.Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Field.Disabled()
  description?: string

  @Field('校验路径', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  fieldPath?: string

  @Field('必填', {
    width: 100,
    align: 'center'
  })
  @Field.Dict('Boolean')
  @Field.Disabled([], disableIfId)
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  required?: number

  @Field('校验规则', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  rule?: string

  @Field('字典编码', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  dictCode?: string
}

/**
 * 外键配置
 */
@Model('GenTableFieldForFk')
export class GenTableFieldForFk extends BaseModel {
  @Field('表ID')
  @Field.Hidden()
  tableId?: string

  @Field('字段名', {
    width: 180
  })
  @Field.Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Field.Disabled()
  description?: string

  @Field('主表', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  mainTable?: string

  @Field('主表字段', {
    width: 180
  })
  @Field.Disabled([], disableIfId)
  mainTableField?: string
}

export interface GenTableField extends GenTableFieldForRule, GenTableFieldForPage, GenTableFieldForDB, GenTableFieldForFk {}

export const field: any = {}

/**
 * 索引配置
 */
@Model('GenTableIndex')
export class GenTableIndex extends BaseModel {
  @Field('表ID')
  @Field.Hidden()
  tableId?: string

  @Field('索引名称')
  indexName?: string

  @Field('索引字段')
  indexFields?: string

  @Field<BaseModel>('索引类型', {
    width: 180,
    dict: 'IndexType'
  })
  indexType?: string
}

@Api('/gen')
export class GeneratorApi extends BaseApi {
  @Post('/generator')
  static generator: HttpRequest<string, GeneratorData>
}

export interface GenAiForm {
  tableName?: string
  tableDesc?: string
  tableJson?: string
  checkedAiFields?: string[]
  checkedCommFields?: string[]
}
