import { router } from '@/router'
import { PageEnum } from '@/enums/PageEnum'
import { useUserStore } from '@/store/modules/user'

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (to.name === PageEnum.BASE_LOGIN_NAME) {
    const user = await userStore.getLoginUser()
    if (user) {
      return PageEnum.BASE_HOME
    }
    return
  }
  if (!from.meta.noAuth) {
    const user = await userStore.getLoginUser()
    if (!user) {
      return { path: PageEnum.BASE_LOGIN, query: { redirect: to.fullPath } }
    }
  }
  return
})
