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
    /**
     * 表单项大小
     * @see Size
     */
    formSize: Size
    /**
     * 表单项列宽
     */
    formColWidth: number
    /**
     * 表单最大行数
     */
    formMaxRows: number
    /**
     * 表单最大列数
     */
    formMaxCols: number
    /**
     * 列表分页选项
     */
    pageSizes: number[]
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
