import type { AppRouteRecordRaw } from '@/router/types'
import { ErrorPage, RedirectName, Layout } from '@/router/constant'
// import { PageEnum } from '@/enums/PageEnum'
import { RouteRecordRaw } from 'vue-router'

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
  name: PageEnum.BASE_LOGIN_NAME,
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true,
    noAuth: true
  }
}

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PageEnum.ERROR_PAGE_NAME,
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideMenu: true
      }
    }
  ]
}

export const RedirectRoute: AppRouteRecordRaw = {
  path: PageEnum.REDIRECT,
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideMenu: true
      }
    }
  ]
}
