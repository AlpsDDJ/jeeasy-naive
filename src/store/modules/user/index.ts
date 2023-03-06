import { LoginForm, UserState } from '@/store/modules/user/type'
import { getLoginUser, login } from '@/api/common'
import { getToken, setToken, clearToken } from '@/utils/tokenUtil'
import { PageEnum } from '@/enums/PageEnum'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken()
  }),
  actions: {
    async doLogin(loginForm: LoginForm) {
      const resp = await login({
        name: loginForm.username,
        pwd: loginForm.password
      })
      console.log('resp ---> ', resp)
      this.setToken(resp.data)
    },
    async getLoginUser() {
      if (this.user) {
        return this.user
      }
      // useRequest()
      const resp = await getLoginUser()
      this.user = resp.data
    },
    async doLogout(remote = true) {
      if (remote) {
        // TODO 服务端注销登录
      }
      this.token = null
      clearToken()
      await useRouter().push(PageEnum.BASE_LOGIN)
    },
    setToken(token: string) {
      this.token = token
      setToken(token)
    }
  },
  getters: {}
})
