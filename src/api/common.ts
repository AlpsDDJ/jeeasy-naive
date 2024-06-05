import { DictData } from '@/components/ext/input/types'
import { Axios, AxiosDescriptorBuilder, AxiosDescriptorConfig, Get, Post } from 'easy-descriptor'
import { AxiosInstance } from 'axios'
import http from '@/utils/http'

/**
 * 定义一个MyAxiosDescriptorConfig类，用于配置默认Axios实例。
 * 该类实现了AxiosDescriptorConfig接口。
 */
@AxiosDescriptorBuilder()
export class MyAxiosDescriptorConfig implements AxiosDescriptorConfig {
  // 可选的Axios实例，默认使用空配置创建一个Axios实例
  http?: AxiosInstance = http
}

@Axios()
export class CommonApi {
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
