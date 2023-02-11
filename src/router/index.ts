import { App } from 'vue'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { RedirectRoute } from '@/router/base'
import { PageEnum } from '@/enums/PageEnum'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  alias: '/dashboard',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute]

const router = createRouter({
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

export default router
