export const appConfig: AppState = {
  siteName: 'Jeeasy',
  darkTheme: true,
  layout: {
    accordion: false,
    collapsed: false,
    headerHeight: 64,
    menuMinWidth: 64,
    menuWidth: 240
  },
  menus: []
}

export const appSetting: AppSetting = {
  formMaxCols: 6,
  formMaxRows: 8,
  formSize: 'medium',
  formColWidth: 318,
  pageSizes: [5, 10, 20, 50, 100]
}

export const formTypeTitleMap = {
  [FormType.ADD]: '新增',
  [FormType.EDIT]: '编辑',
  [FormType.VIEW]: '查看'
}
