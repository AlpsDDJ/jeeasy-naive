import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

export const SystemRouter: RouteRecordRaw = {
  path: '/sys',
  component: Layout,
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'CogOutline'
  },
  children: [
    {
      path: '/sys/user',
      name: 'SysUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'PersonOutline'
      }
    },
    {
      path: '/sys/role',
      name: 'SysRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'PeopleOutline'
      }
    }
  ]
}
