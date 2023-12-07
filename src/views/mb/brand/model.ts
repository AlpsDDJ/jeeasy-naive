// import { BaseModel } from '@/hooks/useModel'
// import Field from '../../../hooks/useModel/decorator/field'

// @Model.Api('sys/role')
// @Model.Perms('sys:role')
import { FormDataType } from '@/enums/EEnum'

@Model('MbBrand')
class MbBrand extends BaseModel {
  @Field('品牌名称')
  brandName?: string

  @Field('品牌编码')
  code?: string

  @Field('启用标记')
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Field.Dict()
  enableFlag?: number
}

export default MbBrand
