import type { HttpRequest } from 'easy-descriptor'
import { Api, Post } from 'easy-descriptor'

type ChatMessageType = {
  messageType?: 'user' | 'assistant'
  content: string
  sessionId?: string
  appId?: string
  maxHistory?: number

  params: Record<string, any>
}

@Api()
export class AiChatApi {
  /**
   * 静态属性调用：
   * CommonApi.login()
   */
  @Post('/ai/chat', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream'
    }
  })
  static sse: HttpRequest<string, ChatMessageType>

  // /**
  //  * 由于 tsconig 配置了 useDefineForClassFields = true, 所以 declare 必须声明，不然装饰器配置默认值无效
  //  * 调用方式：
  //  * new CommonApi().test()
  //  */
  // @Get('/sys/user/menus')
  // declare test: HttpRequest
}
