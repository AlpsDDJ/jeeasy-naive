import { Field, IBaseModel } from 'easy-descriptor'
import { EzFieldOption } from './types'
import { DataKey } from 'easy-descriptor/dist/types'

export class BaseModel<T extends BaseModel<T> = BaseModel<any>> extends IBaseModel<T, EzFieldOption> {
  static modelKey: DataKey = 'BaseModel'

  @Field.Hidden()
  @Field('ID')
  id?: string

  @Field.Hidden()
  @Field('创建时间')
  createTime?: string

  @Field.Hidden()
  @Field('更新时间')
  updateTime?: string
}
