import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => ({
    siteName: 'Jeeasy Naive',
    darkTheme: false,
    layout: {
      collapsed: true
    }
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
    }
  }
})
