import { LoginForm, UserState } from '@/store/modules/user/type'
import { CommonApi } from '@/api/common'
// import { PageEnum } from '@/enums/PageEnum'
import { router } from '@/router'
import { cloneDeep } from 'lodash-es'

const nullState: UserState = {
  token: null,
  roles: [],
  permissions: [],
  menus: []
}

export const useUserStore = defineStore('user', {
  state: (): UserState => cloneDeep(nullState),
  actions: {
    async doLogin(loginForm: LoginForm) {
      try {
        const resp = await CommonApi.login({
          name: loginForm.username,
          pwd: loginForm.password
        })
        this.setToken(resp.data)
        return true
      } catch (error) {
        return false
      }
    },
    async getLoginUser() {
      if (this.user) {
        return this.user
      }
      if (!this.token) {
        return null
      }
      try {
        const {
          data: { roleSet, permissionSet, ...user }
        } = await CommonApi.getLoginUser()
        this.user = user
        this.roles = roleSet
        this.permissions = permissionSet
        return this.user
      } catch (error) {
        return null
      }
    },
    async getUserMenus() {
      if (this.menus && this.menus.length) {
        return this.menus
      }
      try {
        const { data: menus } = await CommonApi.getUserMenus()
        this.menus = menus
        return menus
      } catch (error) {
        return null
      }
    },
    async doLogout(remote = true) {
      if (remote) {
        // TODO 服务端注销登录
      }
      this.token = null
      this.user = undefined
      this.roles = []
      this.permissions = []
      this.clearAll()
      await router.push({
        path: PageEnum.BASE_LOGIN,
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    },
    setToken(token: string) {
      this.token = token
    },
    clearAll() {
      this.$reset()
    }
  },
  getters: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth', // 修改存在缓存中的key值
        storage: localStorage, /// 修改存储方式为localStorage，默认sessionStorage
        paths: ['token'] // 只持久化'curTheme'，此时刷新页面curTheme数据会被保留，其他state将会重置
      }
    ]
  }
})

export const getToken = () => {
  return useUserStore && useUserStore().token
}
