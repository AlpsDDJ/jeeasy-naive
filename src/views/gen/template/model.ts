import { FormDataType, InputType } from '@/enums/EEnum'

@Model('GenTemplate')
export default class GenTemplate extends BaseModel {
  /**
   * 文件名
   */
  @Field('文件名')
  @DataType(FormDataType.STRING)
  fileName?: string
  /**
   * 模板类型
   */
  @Field('模板类型')
  @DataType(FormDataType.STRING)
  type?: string
  /**
   * 备注
   */
  @Field('备注')
  @Hidden(['query'])
  @DataType(FormDataType.STRING)
  remark?: string
  /**
   * 模板内容
   */
  @Field('模板内容', { formSpan: 5 })
  @Hidden(['list', 'query'])
  @DataType(FormDataType.STRING, InputType.TEXT_AREA)
  context?: string
  /**
   * 启用标记
   */
  @Field('启用标记')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Dict()
  enableFlag?: number
}
