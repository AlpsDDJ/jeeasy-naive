import { FormDataType } from '@/enums/EEnum'

const hiddenIfNotTree = ({ izTree }) => !izTree

@Model()
export default class GenTable extends BaseModel {
  @Field('表名')
  name?: string

  @Field('表描述')
  description?: string

  @Field('数据源')
  dataSource?: string

  @Field('同步数据库')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataType.NUMBER)
  @Field.Hidden(['form'])
  izSync?: number

  @Field('简单查询')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataType.NUMBER)
  @Field.Hidden(['list', 'query'])
  izSimpleQuery?: number

  @Field('分页')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataType.NUMBER)
  @Field.Hidden(['list', 'query'])
  izPage?: number

  @Field('树形表单')
  @Field.Dict('Boolean')
  @Field.DataType(FormDataType.NUMBER)
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
  @Field.DataType(FormDataType.NUMBER)
  formType?: number

  @Field('表类型')
  @Field.Dict('TableType')
  tableType?: string

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
  @Field.Hidden(['list', 'query'], ({ tableType }) => tableType === 'single')
  relationType?: string

  @Field('子表')
  @Field.Hidden()
  subTableStr?: string

  @Field('附表排序')
  @Field.DataType(FormDataType.NUMBER)
  @Field.Hidden()
  tabOrderNum?: number
}
