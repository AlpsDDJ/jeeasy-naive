<template><div /> </template>

<script lang="ts" setup>
  import { useDialog, useMessage, useLoadingBar } from 'naive-ui'
  window['$message'] = useMessage()
  window['$dialog'] = useDialog()
  window['$loading'] = useLoadingBar()
</script>
