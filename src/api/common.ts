import { BaseApi } from '@/hooks/useApi'

// @Api('sys')
export class CommonApi extends BaseApi {
  /**
   * 静态属性调用：
   * CommonApi.login()
   */
  @Api.Post('/sso/doLogin')
  static login: HttpRequest<string>

  @Api.Get('/sso/userinfo')
  static getLoginUser: HttpRequest

  @Api.Get('/sys/user/menus')
  static getUserMenus: HttpRequest

  @Api.Get('/sys/common/dicts/{code}')
  static getDicts: HttpRequest

  /**
   * 由于 tsconig 配置了 useDefineForClassFields = true, 所以 declare 必须声明，不然装饰器配置默认值无效
   * 调用方式：
   * new CommonApi().test()
   */
  @Api.Get('/sys/user/menus')
  declare test: HttpRequest
}
