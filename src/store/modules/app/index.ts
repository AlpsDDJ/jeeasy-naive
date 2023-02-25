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
  }
})
