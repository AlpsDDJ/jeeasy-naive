import { FormDataType } from '@/enums/EEnum'

@Model('MbBrand')
class MbBrand extends BaseModel {
  @Field('品牌名称')
  brandName?: string

  @Field('品牌编码')
  code?: string

  @Field('启用标记')
  @DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Dict()
  enableFlag?: number
}

export default MbBrand
