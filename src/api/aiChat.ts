import type { HttpRequest } from 'easy-descriptor'
import { Api, Post } from 'easy-descriptor'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { FetchEventSourceInit } from '@microsoft/fetch-event-source/lib/cjs/fetch'
import { BASE_URL } from '@/utils/http/config'

export type ChatMessageType = {
  messageType?: 'user' | 'assistant'
  content: string
  sessionId?: string
  appCode?: string
  maxHistory?: number

  params?: Record<string, any>
}

export type ChatMessageResp = {
  sessionId: string
  messages: {
    type: string
    content: string
  }
}

@Api()
class AiChatApi {
  /**
   * 静态属性调用：
   * CommonApi.login()
   */
  @Post('/ai/chat', { timeout: 0 })
  static chat: HttpRequest<R<ChatMessageResp>, ChatMessageType>
}

export const sseChat = (data: ChatMessageType, consfig?: Partial<FetchEventSourceInit>) => {
  return fetchEventSource(`${BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream'
    },
    body: JSON.stringify(data),
    ...consfig
    // signal: ctrl.signal,
  })
}
export const chat = AiChatApi.chat
