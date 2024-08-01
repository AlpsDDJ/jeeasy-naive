import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model('AiChatApp')
export default class AiChatApp extends BaseModel {
  /**
   * 应用名称
   */
  @Field('应用名称')
  @Field.DataType(FormDataTypeEnum.STRING)
  name?: string
  /**
   * 应用名称
   */
  @Field('应用编号')
  @Field.DataType(FormDataTypeEnum.STRING)
  code?: string
  /**
   * 模型
   */
  @Field('模型')
  // @Field.Hidden(['list', 'form'])
  @Field.DataType(FormDataTypeEnum.STRING)
  model?: string
  /**
   * 提示词
   */
  @Field<BaseModel>('提示词', { formSpan: 3, formCompProps: { rows: 35 } })
  @Field.Hidden(['query', 'list'])
  @Field.DataType(FormDataTypeEnum.STRING, InputTypeEnum.TEXT_AREA)
  prompt?: string
  /**
   * 启用标记
   */
  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict()
  enableFlag?: string
}
