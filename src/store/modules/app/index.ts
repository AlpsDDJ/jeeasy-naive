import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { appConfig } from '@/config/app.config'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    ...appConfig
  }),
  actions: {
    toggleTheme(darkTheme?: boolean) {
      if (darkTheme === undefined) {
        this.darkTheme = !this.darkTheme
      } else {
        this.darkTheme !== darkTheme && (this.darkTheme = darkTheme)
      }
    },
    toggleCollapsed(collapsed?: boolean) {
      if (collapsed === undefined) {
        this.layout.collapsed = !this.layout.collapsed
      } else {
        this.layout.collapsed !== collapsed && (this.layout.collapsed = collapsed)
      }
    }
  },
  getters: {
    getCollapsed: (state): boolean => state.layout.collapsed,
    getSiteName: (state): string => state.siteName,
    getTheme: (state): GlobalTheme | null => {
      return state.darkTheme ? darkTheme : null
    },
    getAccordion: (state): boolean => state.layout.accordion,
    getMenus: (state) => state.menus
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'appSetting', // 修改存在缓存中的key值
        storage: localStorage, /// 修改存储方式为localStorage，默认sessionStorage
        paths: ['darkTheme'] // 只持久化'curTheme'，此时刷新页面curTheme数据会被保留，其他state将会重置
      }
    ]
  }
})
