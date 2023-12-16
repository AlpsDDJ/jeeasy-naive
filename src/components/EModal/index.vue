<template>
  <n-drawer v-if="props.type === 'drawer'" v-model:show="show" :width="props.width" v-bind="$attrs">
    <n-drawer-content>
      <template v-if="props.title" #header>
        <slot name="header">{{ props.title }}</slot>
      </template>
      <slot />
      <template v-if="props.actions" #footer>
        <slot name="footer">
          <div class="e-form-bottom" justify="space-between" style="width: 100%" :wrap-item="false">
            <div class="e-form-bottom-left">
              <action-button :actions="props.actions" @action:close="close" @action:ok="ok"></action-button>
            </div>
            <div class="e-form-bottom-right">
              <slot name="bottom" />
            </div>
          </div>
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
    actions: () => [
      {
        action: 'ok',
        html: '确定',
        secondary: true,
        type: 'primary'
        // handle: () => {
        //   ok()
        // }
      },
      {
        action: 'close',
        html: '关闭',
        secondary: true
        // // type: 'primary',
        // isDisabled: true,
        // handle: () => {
        //   close()
        // }
      }
    ]
  })

  defineExpose<{
    open(): void
    close(): void
  }>({
    open: () => {
      console.log('open ------ ')
      show.value = true
    },
    close
  })
</script>

<style scoped></style>
