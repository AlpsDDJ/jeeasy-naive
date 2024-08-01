import { ChatMessageType, sseChat } from '@/api/aiChat'
import { FetchEventSourceInit } from '@microsoft/fetch-event-source/lib/cjs/fetch'
import { result, split } from 'lodash-es'
import { EventSourceMessage } from '@microsoft/fetch-event-source'

type SseChatResp = {
  results: string
  resultIndex: number
  sessionId: string
}

type SseResultHandle = (result: string, index: number) => void

export const useSseChat = () => {
  const _results = ref<string>('')
  const resultIndex = ref<number>(0)
  const sessionId = ref<string>('')

  let resultHandle: SseResultHandle
  let _split = false
  const onMsg = (call: SseResultHandle, split?: boolean) => {
    resultHandle = call
    _split = !!split
  }
  const open = (params: ChatMessageType, config?: Partial<FetchEventSourceInit>) => {
    return new Promise<SseChatResp>(async (resolve, reject) => {
      console.log('params  --> ', params)
      await sseChat(params, {
        ...config,
        onmessage: (event: EventSourceMessage) => {
          config?.onmessage?.(event)
          if (event.data) {
            const resultData = JSON.parse(event.data)
            console.log('resultData: ', resultData)
            const { type: resultType, content } = resultData

            switch (resultType) {
              case 'RESULT':
                _results.value += content
                resultIndex.value = Number(event.id)
                resultHandle?.(_split ? content : _results.value, resultIndex.value)
                break
              case 'COMPLETE':
                sessionId.value = content
                // config?.oncomplete?.(_results.value, content)
                resolve({ results: _results.value, resultIndex: resultIndex.value, sessionId: sessionId.value })
                break
              default:
                console.warn('未知返回类型[result]: ', resultData)
                break
            }
          }
        },
        onerror: (err) => {
          reject(err)
        }
      })
    })
  }

  return {
    results: _results,
    resultIndex,
    sessionId,
    open,
    onMsg
  }
}
