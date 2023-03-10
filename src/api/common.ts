import { httpRequest } from '@/utils/http'
import { Api, BaseApi } from '@/hooks/useHttp'

// export const login = (params) => {
//   return httpPost<string>('/sys/sso/doLogin', params)
// }
//
// export const getLoginUser = () => {
//   return httpGet('/sys/sso/userinfo')
// }
//
// export const getUserMenus = () => {
//   return httpGet('/sys/sys/user/menus')
// }

type HttpRequest<T = any, P = any> = typeof httpRequest<T, P>

@Api({ module: 'sys' })
export class CommonApi extends BaseApi {
  @Api.Post('/sso/doLogin')
  static login: HttpRequest<string>

  @Api.Get('/sso/userinfo')
  static getLoginUser: HttpRequest

  @Api.Get('/sys/user/menus')
  static getUserMenus: HttpRequest
}

// CommonApi.login({ name: 'admin', pwd: '123456' }).then((res) => {
//   console.log(res)
// })
