import { Field, FormDataTypeEnum, InputTypeEnum, Model } from 'easy-descriptor'
import { BaseModel } from '@/hooks/useModel'

@Model('MbBrand')
class MbBrand extends BaseModel {
  @Field('品牌名称')
  brandName?: string

  @Field('品牌编码')
  code?: string

  @Field('启用标记')
  @Field.DataType(FormDataTypeEnum.NUMBER, InputTypeEnum.SWITCH)
  @Field.Dict()
  enableFlag?: number
}

export default MbBrand
