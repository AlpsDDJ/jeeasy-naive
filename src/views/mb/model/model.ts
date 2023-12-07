// import { BaseModel } from '@/hooks/useModel'
// import Field from '../../../hooks/useModel/decorator/field'

// @Model.Api('sys/role')
// @Model.Perms('sys:role')
import { FormDataType } from '@/enums/EEnum'

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
  @Field.DataType(FormDataType.NUMBER, InputType.SWITCH)
  @Field.Dict('enableFlag')
  enableFlag?: number
}

export default MbModel
