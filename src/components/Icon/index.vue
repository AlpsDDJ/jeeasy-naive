<script lang="tsx">
  export default defineComponent({
    name: 'Icon',
    props: {
      iconName: {
        type: String,
        required: true
      }
    },
    render() {
      const { iconName } = this.$props
      const attrs = toRefs(this.$attrs)
      const IconComp = defineAsyncComponent(async () => {
        // @ts-ignore
        const { [iconName]: comp } = await import('@vicons/ionicons5')
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
