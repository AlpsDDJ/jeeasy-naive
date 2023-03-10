import { router, menuToRouter } from '@/router'
import { PageEnum } from '@/enums/PageEnum'
import { useUserStore } from '@/store/modules/user'

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (to.name === PageEnum.BASE_LOGIN_NAME) {
    const user = await userStore.getLoginUser()
    if (user) {
      return PageEnum.BASE_HOME
    }
    return
  }
  if (!to.meta.noAuth) {
    const user = await userStore.getLoginUser()
    if (!user) {
      return { path: PageEnum.BASE_LOGIN, query: { redirect: to.fullPath } }
    }
    if (!userStore.menus || !userStore.menus.length) {
      const routers = (await menuToRouter(await userStore.getUserMenus())) || []
      for (const r of routers) {
        await router.addRoute(r)
      }
      const { fullPath, query } = to
      return { path: fullPath, query, replace: true }
    }
  }
  return
})
