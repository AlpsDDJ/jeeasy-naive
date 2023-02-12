import { App } from 'vue'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { ErrorPageRoute, RedirectRoute } from '@/router/base'
import { PageEnum } from '@/enums/PageEnum'
import { Layout } from '@/router/constant'
// import { LaptopOutline as WorkIcon, LogOutOutline as HomeIcon } from '@vicons/ionicons5'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    hideMenu: true
  },
  children: [
    {
      path: PageEnum.BASE_HOME,
      component: Layout,
      name: 'Dashboard',
      redirect: {
        name: 'Workplace'
      },
      meta: {
        title: ''
      },
      children: [
        {
          path: 'workplace',
          name: 'Workplace',
          component: () => import('@/views/dashboard/workplace.vue'),
          meta: {
            title: '工作台'
            // icon: WorkIcon
          }
        },
        {
          path: 'console',
          name: 'Console',
          component: () => import('@/views/dashboard/console.vue'),
          meta: {
            title: '主控台',
            icon: 'Accessibility'
          }
        }
      ]
    }
  ]
}

export const LoginRoute: RouteRecordRaw = {
  path: PageEnum.BASE_LOGIN,
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true
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
