import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model('MbModel')
class MbModel extends BaseModel {
  @Field('品牌')
  @Field.Dict('#mb_brand')
  brandCode?: string

  @Field('型号名称')
  model?: string

  @Field('型号编码')
  code?: string

  @Field('启用标记')
  @Field.Hidden(['add'])
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict('enableFlag')
  enableFlag?: number
}

export default MbModel
