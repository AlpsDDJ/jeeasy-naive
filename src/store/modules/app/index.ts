import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    siteName: 'Jeeasy Naive',
    darkTheme: false,
    layout: {
      collapsed: true,
      accordion: false
    },
    menus: []
  }),
  actions: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    }
  },
  getters: {
    getCollapsed: (state) => state.layout.collapsed,
    getSiteName: (state) => state.siteName,
    getTheme: (state): GlobalTheme | null => {
      return state.darkTheme ? darkTheme : null
    },
    getAccordion: (state) => state.layout.accordion,
    getMenus: (state) => state.menus
  }
})
