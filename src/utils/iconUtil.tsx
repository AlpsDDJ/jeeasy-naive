import { h } from 'vue'

export async function renderIcon(icon: string) {
  // @ts-ignore
  const { [icon]: iconComp } = await import('@vicons/ionicons5')
  return () => <n-icon>{iconComp}</n-icon>
}
