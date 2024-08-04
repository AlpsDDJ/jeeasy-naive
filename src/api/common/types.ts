export interface UserMenu {
  id: string
  parentId: string
  name: string
  path: string
  icon: string
  component: string
  target: string
  children: UserMenu[]
}

export interface LoginUser {
  id: string
  username: string
  userNo?: number
  phone?: string
  realName?: string
  sex?: number
  birthday?: string
  status?: number
  email?: string
  avatar?: string
  createTime?: string
  createBy?: string
  updateTime?: string
  updateBy?: string
  remark?: string
  delFlag?: number
  roleSet?: string[]
  permissionSet?: string[]
}
