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
      const attrs = toRefs(this.$attrs)
      const IconComp = defineAsyncComponent(async () => {
        // @ts-ignore
        const { [iconName]: comp } =
          type === 'ionicons5' ? await import('@vicons/ionicons5') : await import('@vicons/antd')
        return comp
      })
      return (
        <n-icon {...attrs}>
          <IconComp />
        </n-icon>
      )
    }
  })
</script>
