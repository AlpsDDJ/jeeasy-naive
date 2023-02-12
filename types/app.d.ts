import { MenuMixedOption } from 'naive-ui/es/menu/src/interface'

declare global {
  interface AppState {
    siteName: string
    layout: LayoutState
    darkTheme: boolean
    menus: MenuMixedOption[]
  }

  interface LayoutState {
    collapsed: boolean
    accordion: boolean
  }
}

export default {}
