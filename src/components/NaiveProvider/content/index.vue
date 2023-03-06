<template><div /> </template>

<script lang="ts" setup>
  import { useDialog, useMessage, useLoadingBar, useNotification } from 'naive-ui'
  window.$message = useMessage()
  window.$dialog = useDialog()
  window.$loading = useLoadingBar()
  window.$notification = useNotification()
</script>
