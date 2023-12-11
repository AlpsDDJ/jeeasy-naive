import { FormDataType } from '@/enums/EEnum'

const hiddenIfNotTree = ({ izTree }) => !izTree

@Model()
export default class GenTable extends BaseModel {
  @Field('表名')
  @Disabled(['edit'])
  name?: string

  @Field('表描述')
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

  tableFields?: (GenTableFieldForDB & GenTableFieldForPage)[]
}

@Model()
export class GenTableField extends BaseModel {
  @Field('表ID')
  @Hidden()
  tableId?: string
}

@Model()
export class GenTableFieldForDB extends GenTableField {
  @Field('列名', {
    width: 180
  })
  columnName?: string

  @Field('字段描述', {
    width: 180
  })
  description?: string

  @Field('数据类型', {
    width: 180,
    dict: 'JdbcType',
    inputProps: {
      filterable: true
    }
  })
  jdbcType?: string

  @Field('字段名')
  @Hidden()
  fieldName?: string

  @Field('字段长度', {
    width: 100
  })
  @DataType(FormDataType.NUMBER)
  length?: number

  @Field('小数位', {
    width: 100
  })
  @DataType(FormDataType.NUMBER)
  decimalPlaces?: number

  @Field('默认值', {
    width: 150
  })
  defaultValue?: string

  @Field('主键', {
    width: 100,
    dict: 'Boolean'
  })
  // @Dict('Boolean')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  primaryKey?: number

  @Field('允许空值', {
    width: 100
  })
  @Dict('Boolean')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  allowNull?: number
}

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
  fieldName?: string

  @Field('java类型')
  javaType?: string

  @Field('字典')
  dictCode?: string

  @Field('表单类型')
  formType?: string

  @Field('页面配置')
  @Hidden()
  viewOptionsJson?: string
}
