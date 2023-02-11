import { App } from 'vue'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { ErrorPageRoute, RedirectRoute } from '@/router/base'
import { PageEnum } from '@/enums/PageEnum'
import { Layout } from '@/router/constant'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  component: Layout,
  meta: {
    title: 'Root'
  },
  children: [
    {
      path: PageEnum.BASE_HOME,
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}

export const LoginRoute: RouteRecordRaw = {
  path: PageEnum.BASE_LOGIN,
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute, ErrorPageRoute]

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
