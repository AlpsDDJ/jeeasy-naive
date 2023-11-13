import { useAttrs } from 'vue'
export const useAttrProp = (props: any) => {
  const attrs = useAttrs()
  // const props = withDefaults(defineProps<T>(), {
  //   ...defaultProps
  // })
  Object.keys(attrs).forEach((key) => {
    props[key] = attrs[key]
  })
  return props
}
