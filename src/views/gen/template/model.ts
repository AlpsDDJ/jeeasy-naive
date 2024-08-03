import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model('GenTemplate')
export default class GenTemplate extends BaseModel {
  /**
   * 模板名称
   */
  @Field('模板名称')
  @Field.DataType(FormDataTypeEnum.STRING)
  name?: string
  /**
   * 文件名
   */
  @Field('文件名')
  @Field.DataType(FormDataTypeEnum.STRING)
  fileName?: string
  /**
   * 模板类型
   */
  @Field('模板类型')
  @Field.DataType(FormDataTypeEnum.STRING)
  type?: string
  /**
   * 备注
   */
  @Field('备注')
  @Field.Hidden(['query'])
  @Field.DataType(FormDataTypeEnum.STRING)
  remark?: string
  /**
   * 启用标记
   */
  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict()
  enableFlag?: number
  /**
   * 模板内容
   */
  @Field<GenTemplate>('模板内容', { formSpan: 5, formCompProps: { rows: 30 } })
  @Field.Hidden(['list', 'query'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT_AREA)
  context?: string
}
