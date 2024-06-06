import { Field, IBaseModel } from 'easy-descriptor'
import { EzFieldOption } from './types'

export class BaseModel<T extends BaseModel<T> = BaseModel<any>> extends IBaseModel<T, EzFieldOption> {
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
