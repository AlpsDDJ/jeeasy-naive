import { FormDataType } from '@/enums/EEnum'

@Model('MbModel')
class MbModel extends BaseModel {
  @Field('品牌')
  @Dict('#mb_brand')
  brandCode?: string

  @Field('型号名称')
  model?: string

  @Field('型号编码')
  code?: string

  @Field('启用标记')
  @Hidden(['add'])
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Dict('enableFlag')
  enableFlag?: number
}

export default MbModel
