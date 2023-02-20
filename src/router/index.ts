import { App } from 'vue'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { ErrorPageRoute, RedirectRoute } from '@/router/base'
import { PageEnum } from '@/enums/PageEnum'
import { Layout } from '@/router/constant'
import { SystemRouter } from '@/router/modules/system'

export const RootRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      hideMenu: true
    }
  },
  {
    path: PageEnum.BASE_HOME,
    component: Layout,
    name: 'Dashboard',
    redirect: {
      name: 'Console'
    },
    meta: {
      title: 'Dashboard',
      icon: 'HomeOutline'
    },
    children: [
      {
        path: '/dashboard/console',
        name: 'Console',
        component: () => import('@/views/dashboard/console.vue'),
        meta: {
          title: '主控台',
          icon: 'SpeedometerOutline'
        }
      },
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace.vue'),
        meta: {
          title: '工作台',
          icon: 'DesktopOutline'
        }
      }
    ]
  }
]

export const LoginRoute: RouteRecordRaw = {
  path: PageEnum.BASE_LOGIN,
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true
  }
}

export const constantRouter: RouteRecordRaw[] = [LoginRoute, ...RootRoute, SystemRouter, RedirectRoute, ErrorPageRoute]

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
