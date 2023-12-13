import { FormDataType } from '@/enums/EEnum'
import { Rule } from '@/hooks/useModel/decorator/Field'

const hiddenIfNotTree = ({ izTree }) => !izTree

@Model()
export default class GenTable extends BaseModel {
  @Field('表名')
  @Disabled(['edit'])
  name?: string

  @Field('表描述')
  @Rule({ required: true })
  description?: string

  @Field('表类型')
  @Dict('TableType')
  tableType?: string

  @Field('数据源')
  dataSource?: string

  @Field('同步数据库')
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER)
  @Hidden(['form'])
  izSync?: number

  @Field('简单查询')
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER)
  @Hidden(['list', 'query'])
  izSimpleQuery?: number

  @Field('分页')
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER)
  @Hidden(['list', 'query'])
  izPage?: number

  @Field('树形表单')
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER)
  izTree?: number

  @Field('树PID')
  @Hidden(['list', 'query'], hiddenIfNotTree)
  // @Hidden(['list', 'query'])
  treePid?: string

  @Field('树名称字段')
  @Hidden(['list', 'query'], hiddenIfNotTree)
  treeNameField?: string

  @Field('表单风格')
  @Dict('TableStyle')
  @DataType(FormDataType.NUMBER)
  formType?: number

  @Field('主表')
  @Hidden()
  mainTable?: string

  @Field('从表')
  @Hidden()
  slaveTable?: string

  @Field('主表字段')
  @Hidden()
  mainColumn?: string

  @Field('主表字段code')
  @Hidden()
  mainColumnCode?: string

  @Field('从表字段')
  @Hidden()
  slaveColumn?: string

  @Field('从表字段code')
  @Hidden()
  slaveColumnCode?: string

  @Field('映射关系')
  @Dict('RelationType')
  @Hidden(['list', 'query'], ({ tableType }) => tableType === 'single')
  relationType?: string

  @Field('子表')
  @Hidden()
  subTableStr?: string

  @Field('附表排序')
  @DataType(FormDataType.NUMBER)
  @Hidden()
  tabOrderNum?: number

  /**
   * 表字段列表
   */
  tableFields?: (GenTableFieldForDB & GenTableFieldForPage)[]
  /**
   * 表索引列表
   */
  tableIndexs?: GenTableIndex[]
}

@Model()
export class GenTableField extends BaseModel {
  @Field('表ID')
  @Hidden()
  tableId?: string
}

const disableIfId = ({ columnName }) => columnName === 'id'

/**
 * 数据库属性
 */
@Model()
export class GenTableFieldForDB extends GenTableField {
  @Field('列名', {
    width: 180
  })
  @Disabled([], disableIfId)
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Disabled([], disableIfId)
  description?: string

  @Field('数据类型', {
    width: 180,
    dict: 'JdbcType',
    inputProps: {
      filterable: true
    }
  })
  @Disabled([], disableIfId)
  jdbcType?: string

  @Field('字段名')
  @Hidden()
  @Disabled([], disableIfId)
  fieldName?: string

  @Field('字段长度', {
    width: 100,
    align: 'center'
  })
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER)
  length?: number

  @Field('小数位', {
    width: 100,
    align: 'center'
  })
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER)
  decimalPlaces?: number

  @Field('默认值', {
    width: 150
  })
  @Disabled([], disableIfId)
  defaultValue?: string

  @Field('主键', {
    width: 100,
    align: 'center',
    dict: 'Boolean'
  })
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  primaryKey?: number

  @Field('允许空值', {
    width: 100,
    align: 'center'
  })
  @Disabled([], disableIfId)
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  allowNull?: number
}

/**
 * 页面属性
 */
@Model()
export class GenTableFieldForPage extends GenTableField {
  @Field('列名', {
    width: 180
  })
  @Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Disabled()
  description?: string

  @Field('字段名')
  @Disabled([], disableIfId)
  fieldName?: string

  @Field('java类型')
  @Disabled([], disableIfId)
  javaType?: string

  @Field('页面配置')
  @Hidden()
  viewOptionsJson?: string

  @Field('修改时展示', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  showAdd?: number

  @Field('修改时展示', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  showTable?: number

  @Field('新增时禁用', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  disableOnAdd?: number

  @Field('修改时禁用', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  disableOnEdit?: number

  @Field('行内编辑禁用', {
    width: 120
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  disableOnTableEdit?: number

  @Field('控件类型', {
    width: 180
  })
  @Disabled([], disableIfId)
  formType?: string

  @Field('是否查询', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  showSearch?: number

  @Field('搜索类型', {
    width: 180,
    dict: 'SearchType'
  })
  @Disabled([], disableIfId)
  searchType?: string
}

/**
 * 校验属性
 */
@Model()
export class GenTableFieldForRule extends GenTableField {
  @Field('列名', {
    width: 180
  })
  @Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Disabled()
  description?: string

  @Field('校验路径', {
    width: 180
  })
  @Disabled([], disableIfId)
  fieldPath?: string

  @Field('必填', {
    width: 100,
    align: 'center'
  })
  @Dict('Boolean')
  @Disabled([], disableIfId)
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  required?: number

  @Field('校验规则', {
    width: 180
  })
  @Disabled([], disableIfId)
  rule?: string

  @Field('字典编码', {
    width: 180
  })
  @Disabled([], disableIfId)
  dictCode?: string
}

/**
 * 外键配置
 */
@Model()
export class GenTableFieldForFk extends GenTableField {
  @Field('列名', {
    width: 180
  })
  @Disabled()
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  @Disabled()
  description?: string

  @Field('主表', {
    width: 180
  })
  @Disabled([], disableIfId)
  mainTable?: string

  @Field('主表字段', {
    width: 180
  })
  @Disabled([], disableIfId)
  mainTableField?: string
}

/**
 * 索引配置
 */
@Model()
export class GenTableIndex extends BaseModel {
  @Field('表ID')
  @Hidden()
  tableId?: string

  @Field('索引名称')
  indexName?: string

  @Field('索引字段')
  indexFields?: string

  @Field('索引类型', {
    width: 180,
    dict: 'IndexType'
  })
  indexType?: string
}
