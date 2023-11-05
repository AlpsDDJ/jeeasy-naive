<template>
  <n-space :align="props.align || 'end'">
    <template v-for="opt in actionOptions" :key="opt.action">
      <n-button
        v-if="opt.show"
        :disabled="typeof opt.isDisabled === 'function' ? opt.isDisabled(data) : opt.isDisabled"
        v-bind="{ ...opt, ...$attrs }"
        @click="opt.handle ? opt.handle(data) : $emit(`action:${opt.action}`, data)"
      >
        {{ opt.html }}
      </n-button>
    </template>
    <slot />
  </n-space>
</template>

<script lang="ts" setup>
  import { isNotNull } from '@/utils/tools'
  import { commonActions } from './commonActions'
  import type { ActionOption, ActionButtonProps } from './commonActions'

  // function actionHandle(action, row, index) {}

  defineOptions({
    name: 'ActionButton'
  })

  const props = defineProps<ActionButtonProps>()
  const { actions = ref(true), data } = toRefs(props)

  const actionOptions = computed<ActionOption[]>(() => {
    const options: ActionOption[] = []
    switch (typeof actions.value) {
      case 'object':
        if (isNotNull(actions.value)) {
          if (typeof actions.value[0] === 'string') {
            actions.value.forEach((act) => {
              const option = commonActions.find(({ action }) => act == action) || { action: act, html: act }
              if (option) {
                options.push(option)
              }
            })
          } else {
            options.push(...(actions.value as ActionOption[]))
          }
        }
        break
      default:
        if (actions.value !== false) {
          options.push(...commonActions.filter(({ autoShow = false }) => autoShow))
        }
    }
    return options.map(({ disabled = false, show = true, ...opt }) => ({ ...opt, disabled, show }))
  })
  // actionOptions.value.forEach((item) => {
  //   defineEmits(`action:${item.action}`, data.value)
  // })

  defineEmits(commonActions.map(({ action }) => `action:${action}`))
</script>

<style scoped></style>
