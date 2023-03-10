import { App, Component } from 'vue'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { LoginRoute, RootRoute, RedirectRoute, ErrorPageRoute } from '@/router/base'
import { ErrorPage, Layout } from '@/router/constant'

export const constantRouter: RouteRecordRaw[] = [LoginRoute, ...RootRoute, RedirectRoute, ErrorPageRoute]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
  await app.use(router)
  // 创建路由守卫
  // createRouterGuards(router)
}

const modules = import.meta.glob('@/views/**/index.vue', { eager: true, import: 'default' })

export const menuToRouter = async (menus?: any[], isChildren = false): Promise<RouteRecordRaw[] | undefined> => {
  if (!menus || !menus.length) {
    return undefined
  }
  const sss = menus.map(async (menu) => {
    const { name, icon, path, component, children } = menu

    const compPath = `/src/views/${component.replace('sys/', 'system/')}/index.vue`
    const comp = modules[compPath]
    const pageComp = (component === 'Layout' ? Layout : comp ? comp : ErrorPage) as Component
    const pageNmae = comp ? pageComp.name : path.replace('/', '')

    const router: RouteRecordRaw = {
      path: isChildren ? path : '/' + path,
      component: pageComp,
      name: pageNmae,
      meta: {
        title: name,
        icon
      },
      children: await menuToRouter(children, true)
    }

    return router
  })
  return await Promise.all(sss)
}
