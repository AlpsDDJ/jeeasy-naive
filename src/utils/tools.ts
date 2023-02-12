/**
 * 判断数据是否为空值
 */
export function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  return JSON.stringify(data) === '[]'
}
/**
 * 判断数据是否为空值
 */
export function isNotNull(data) {
  return !isNull(data)
}
