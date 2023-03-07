import { LoginForm, UserState } from '@/store/modules/user/type'
import { getLoginUser, login } from '@/api/common'
import { getToken, setToken, clearToken } from '@/utils/tokenUtil'
import { PageEnum } from '@/enums/PageEnum'
import { router } from '@/router'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken(),
    roles: [],
    permissions: []
  }),
  actions: {
    async doLogin(loginForm: LoginForm) {
      try {
        const resp = await login({
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
        } = await getLoginUser()
        this.user = user
        this.roles = roleSet
        this.permissions = permissionSet
        return this.user
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
      clearToken()
      await router.push({
        path: PageEnum.BASE_LOGIN,
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    },
    setToken(token: string) {
      this.token = token
      setToken(token)
    }
  },
  getters: {}
})
