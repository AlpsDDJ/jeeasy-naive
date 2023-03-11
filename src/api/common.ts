import { BaseApi } from '@/hooks/useHttp'

@Api('sys')
export class CommonApi extends BaseApi {
  @Api.Post('/sso/doLogin')
  static login: HttpRequest<string>

  @Api.Get('/sso/userinfo')
  static getLoginUser: HttpRequest

  @Api.Get('/sys/user/menus')
  static getUserMenus: HttpRequest

  // @Api.Get('/sys/user/menus')
  // test = httpRequest
  //
  // @Api.Get('/sys/user/menus')
  // test2?: HttpRequest
}
