import { ref } from 'vue'

/**
 * 组件类型标注
 * @param comp 组件实例
 * @returns 完整类型标注的响应式组件实例
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const useCompRef = <T extends abstract new (...args: any) => any>(comp: T) => {
  return ref<InstanceType<T>>()
}
