import { router, menuToRouter } from '@/router'
// import { PageEnum } from '@/enums/PageEnum'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' //指定进度条的父容器
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  if (to.name === PageEnum.BASE_LOGIN_NAME) {
    const user = await userStore.getLoginUser()
    if (user) {
      // return { path: to.query.redirect || PageEnum.BASE_HOME }
      next({ path: (to.query.redirect as string) ?? PageEnum.BASE_HOME })
    }
    next()
  }
  if (!to.meta.noAuth) {
    const user = await userStore.getLoginUser()
    if (!user) {
      // return { path: PageEnum.BASE_LOGIN, query: { redirect: to.fullPath } }
      next({ path: PageEnum.BASE_LOGIN, query: { redirect: to.fullPath } })
    }
    if (!userStore.menus || !userStore.menus.length) {
      const routers = (await menuToRouter(await userStore.getUserMenus())) || []
      for (const r of routers) {
        router.addRoute(r)
      }
      const { fullPath, query } = to
      // return { path: fullPath, query, replace: true }
      next({ path: fullPath, query, replace: true })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
