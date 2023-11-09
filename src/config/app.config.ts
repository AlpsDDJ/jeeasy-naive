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
  formSize: 'small',
  formColWidth: 450
}

export const formTypeTitleMap = {
  [FormType.ADD]: '新增',
  [FormType.EDIT]: '编辑',
  [FormType.VIEW]: '查看'
}
