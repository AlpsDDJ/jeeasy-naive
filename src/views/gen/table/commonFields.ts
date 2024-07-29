import { GenTableField } from '@/views/gen/table/model'

export const commonFields: GenTableField[] = [
  {
    columnName: 'id',
    primaryKey: 1,
    fieldName: 'id',
    description: 'ID',
    jdbcType: 'varchar',
    javaType: undefined,
    length: 36,
    decimalPlaces: 0,
    allowNull: 0,
    defaultValue: undefined,
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'create_time',
    primaryKey: 0,
    fieldName: 'createTime',
    description: '创建时间',
    jdbcType: 'datetime',
    javaType: 'LocalDateTime',
    length: 0,
    decimalPlaces: 0,
    allowNull: 0,
    defaultValue: 'CURRENT_TIMESTAMP',
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'create_by',
    primaryKey: 0,
    fieldName: 'createBy',
    description: '创建人',
    jdbcType: 'varchar',
    javaType: 'String',
    length: 36,
    decimalPlaces: 0,
    allowNull: 1,
    defaultValue: undefined,
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'update_time',
    primaryKey: 0,
    fieldName: 'updateTime',
    description: '更新时间',
    jdbcType: 'datetime',
    javaType: 'LocalDateTime',
    length: 0,
    decimalPlaces: 0,
    allowNull: 1,
    defaultValue: 'CURRENT_TIMESTAMP',
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'update_by',
    primaryKey: 0,
    fieldName: 'updateBy',
    description: '更新人',
    jdbcType: 'varchar',
    javaType: 'String',
    length: 36,
    decimalPlaces: 0,
    allowNull: 1,
    defaultValue: undefined,
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'del_flag',
    primaryKey: 0,
    fieldName: 'delFlag',
    description: '删除标记',
    jdbcType: 'tinyint',
    javaType: 'Integer',
    length: 1,
    decimalPlaces: 0,
    allowNull: 0,
    defaultValue: '0',
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'version',
    primaryKey: 0,
    fieldName: 'version',
    description: '版本',
    jdbcType: 'int',
    javaType: 'Integer',
    length: 5,
    decimalPlaces: 0,
    allowNull: 0,
    defaultValue: '0',
    dictCode: undefined,
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: undefined,
    showEdit: undefined,
    showTable: undefined,
    showSearch: undefined,
    disableOnEdit: undefined,
    disableOnAdd: undefined,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  },
  {
    columnName: 'enable_flag',
    primaryKey: 0,
    fieldName: 'enableFlag',
    description: '启用标记',
    jdbcType: 'tinyint',
    javaType: 'Integer',
    length: 1,
    decimalPlaces: 0,
    allowNull: 0,
    defaultValue: '1',
    dictCode: 'EnableFlag',
    formType: undefined,
    viewOptionsJson: undefined,
    showAdd: 1,
    showEdit: 1,
    showTable: 1,
    showSearch: 1,
    disableOnEdit: undefined,
    disableOnAdd: 0,
    disableOnTableEdit: undefined,
    fieldPath: undefined,
    required: undefined,
    rule: undefined,
    mainTable: undefined,
    mainTableField: undefined
  }
]
