import { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { Size } from 'naive-ui/es/form/src/interface'

declare global {
  interface AppState {
    siteName: string
    layout: LayoutState
    darkTheme: boolean
    menus: MenuMixedOption[]
  }

  interface AppSetting {
    formSize: Size
    formColWidth: number
  }

  interface LayoutState {
    collapsed: boolean
    accordion: boolean
    headerHeight: number
    menuMinWidth: number
    menuWidth: number
  }
}

export default {}
