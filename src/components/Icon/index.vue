<script lang="tsx">
  export default defineComponent({
    name: 'Icon',
    props: {
      iconName: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'ionicons5'
      }
    },
    render() {
      const { iconName, type } = this.$props

      const _iconName = ref(iconName)
      const _type = ref(type)
      if (iconName.indexOf(':') > 0) {
        _iconName.value = iconName.split(':')[1]
        _type.value = iconName.split(':')[0]
      }

      const IconComponent = defineAsyncComponent(async () => {
        let comp
        switch (_type.value) {
          case 'antd':
            comp = (await import('@vicons/antd'))[_iconName.value]
            break
          default:
            comp = (await import('@vicons/ionicons5'))[_iconName.value]
        }
        return comp
        // const ionicons5 = (await import('@vicons/ionicons5'))[iconName]
        // console.log(ionicons5)
        // @ts-ignore
        // const { [iconName]: comp } =
        //   type === 'ionicons5' ? await import('@vicons/ionicons5') : await import('@vicons/antd')
        // return comp
      })
      return (
        <n-icon {...this.$attrs}>
          <IconComponent />
        </n-icon>
      )
    }
  })
</script>
