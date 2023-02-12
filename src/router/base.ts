import type { AppRouteRecordRaw } from '@/router/types'
import { ErrorPage, RedirectName, Layout } from '@/router/constant'
import { PageEnum } from '@/enums/PageEnum'

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
