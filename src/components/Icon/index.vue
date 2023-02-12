<template>
  {{ icon }}
</template>

<script lang="tsx" setup name="Icon">
  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  })
  const icon = computed(async () => {
    // @ts-ignore
    const { [props.name]: IconComp } = await import('@vicons/ionicons5')
    return IconComp
  })
</script>

<style scoped></style>
