<template><div /></template>
<script lang="ts" setup name="LoadingContent">
  import { useLoadingBar } from 'naive-ui'

  window['$loading'] = useLoadingBar()
</script>
