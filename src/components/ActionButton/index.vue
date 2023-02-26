<template>
  <n-space>
    <template v-for="opt in actionOptions" :key="opt.action">
      <n-button
        v-if="opt.show"
        :disabled="typeof opt.disabled === 'boolean' ? opt.disabled : opt.disabled(data)"
        v-bind="{ ...opt, ...$attrs }"
        @click="opt.handle ? opt.handle(data) : $emit(`action:${opt.action}`, data)"
      >
        {{ opt.html }}
      </n-button>
    </template>
    <slot />
  </n-space>
</template>

<script lang="ts" setup name="ActionButton">
  import { isNotNull } from '@/utils/tools'
  import { ButtonProps } from 'naive-ui'

  // type ButonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
  type ActionType = 'edit' | 'delete' | 'view' | 'add' | string

  type ColAttrFn<T> =
    | T
    | {
        (data): T
      }

  type ActionOption = ButtonProps & {
    action: ActionType
    html: string
    handle?: (data: any) => void
    // btnType?: ButonType
    // btnStyle?: 'button' | 'link'
    icon?: string
    autoShow?: boolean
    disabled?: ColAttrFn<boolean>
    show?: ColAttrFn<boolean>
  }

  type ActionButtonProps = {
    actions?: ActionOption[] | ActionType[] | boolean | 'default'
    data?: any
    // index: number
  }

  // function actionHandle(action, row, index) {}

  const commonActions: ActionOption[] = [
    {
      action: 'query',
      html: '查询',
      secondary: true,
      type: 'primary'
    },
    {
      action: 'reset',
      html: '重置',
      secondary: true,
      type: 'tertiary'
    },
    {
      action: 'add',
      html: '添加',
      secondary: true,
      type: 'primary'
    },
    {
      action: 'edit',
      html: '修改',
      text: true,
      type: 'primary',
      autoShow: true
      // handle: (row, index) => {
      //   console.log(`action edit row${index}:`, row)
      // }
    },
    {
      action: 'delete',
      html: '删除',
      text: true,
      type: 'error',
      autoShow: true
      // handle: (row, index) => {
      //   console.log(`action delete row${index}:`, row)
      // }
    },
    {
      action: 'view',
      html: '查看',
      text: true,
      type: 'primary',
      autoShow: false
      // handle: (row, index) => {
      //   console.log(`action edit row${index}:`, row)
      // }
    }
  ]

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

  // const emit = defineEmits(actions!.value!.map(({ action }) => action))
</script>

<style scoped></style>
