<template>
  <n-drawer v-if="props.type === 'drawer'" v-model:show="show" :width="props.width" v-bind="$attrs">
    <n-drawer-content>
      <template v-if="props.title" #header>
        <slot name="header">{{ props.title }}</slot>
      </template>
      <slot />
      <template v-if="props.actions" #footer>
        <slot name="footer">
          <action-button :actions="props.actions" @action:close="close" @action:ok="ok"></action-button>
        </slot>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { EModalProps } from './types'

  defineOptions({
    name: 'EModal'
  })

  const show = defineModel<boolean>('show', { default: false })

  const emits = defineEmits<{
    (e: 'close'): void
    (e: 'ok'): void
  }>()

  const close = () => {
    show.value = false
    emits('close')
  }
  const ok = () => {
    console.log('ok')
    emits('ok')
  }

  const props = withDefaults(defineProps<EModalProps>(), {
    type: 'drawer',
    width: 400,
    actions: [
      {
        action: 'close',
        html: '关闭'
        // // type: 'primary',
        // isDisabled: true,
        // handle: () => {
        //   close()
        // }
      },
      {
        action: 'ok',
        html: '确定',
        type: 'primary'
        // handle: () => {
        //   ok()
        // }
      }
    ]
  })
</script>

<style scoped></style>
