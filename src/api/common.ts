import { BaseApi } from '@/hooks/useApi'
import { DictData } from '@/components/ext/input/types'

export class CommonApi extends BaseApi {
  /**
   * 静态属性调用：
   * CommonApi.login()
   */
  @Post('/sso/doLogin')
  static login: HttpRequest<string>

  @Get('/sso/userinfo')
  static getLoginUser: HttpRequest

  @Get('/sys/user/menus')
  static getUserMenus: HttpRequest

  @Get('/sys/common/dicts/{code}')
  static getDicts: HttpRequest<DictData[]>

  // /**
  //  * 由于 tsconig 配置了 useDefineForClassFields = true, 所以 declare 必须声明，不然装饰器配置默认值无效
  //  * 调用方式：
  //  * new CommonApi().test()
  //  */
  // @Get('/sys/user/menus')
  // declare test: HttpRequest
}
