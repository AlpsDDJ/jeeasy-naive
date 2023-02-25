<template>
  <n-space>
    <template v-for="opt in actionOptions" :key="opt.action">
      <n-button
        v-if="opt.show"
        :text="(opt.btnStyle || 'link') !== 'button'"
        :type="opt.btnType"
        size="small"
        :secondary="opt.btnStyle === 'button'"
        :disabled="typeof opt.disabled === 'boolean' ? opt.disabled : opt.disabled(row, index)"
        @click="opt.handle ? opt.handle(row, index) : $emit(`action:${opt.action}`, row, index)"
      >
        {{ opt.text }}
      </n-button>
    </template>
  </n-space>
</template>

<script lang="ts" setup name="ActionColumn">
  import { isNotNull } from '@/utils/tools'

  type ButonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
  type ActionType = 'edit' | 'delete' | 'view' | 'add' | string

  type ColAttrFn<T> =
    | T
    | {
        (row: any, index: number): T
      }

  type ActionOption = {
    action: ActionType
    text: string
    handle?: (row: any, index: number) => void
    btnType?: ButonType
    btnStyle?: 'button' | 'link'
    icon?: string
    autoShow?: boolean
    disabled?: ColAttrFn<boolean>
    show?: ColAttrFn<boolean>
  }

  type ActionColumnProps = {
    actions?: ActionOption[] | ActionType[] | boolean | 'default'
    row: any
    index: number
  }

  // function actionHandle(action, row, index) {}

  const defauleActions: ActionOption[] = [
    {
      action: 'view',
      text: '查看',
      // btnType: 'primary',
      autoShow: false
      // handle: (row, index) => {
      //   console.log(`action edit row${index}:`, row)
      // }
    },
    {
      action: 'edit',
      text: '修改',
      btnType: 'primary',
      autoShow: true
      // handle: (row, index) => {
      //   console.log(`action edit row${index}:`, row)
      // }
    },
    {
      action: 'delete',
      text: '删除',
      btnType: 'error',
      autoShow: true
      // handle: (row, index) => {
      //   console.log(`action delete row${index}:`, row)
      // }
    }
  ]

  const props = defineProps<ActionColumnProps>()
  const { actions = ref(true), row, index } = toRefs(props)

  const actionOptions = computed<ActionOption[]>(() => {
    const options: ActionOption[] = []
    switch (typeof actions.value) {
      case 'object':
        if (isNotNull(actions.value)) {
          if (typeof actions.value[0] === 'string') {
            actions.value.forEach((act) => {
              const option = defauleActions.find(({ action }) => act == action) || { action: act, text: act }
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
          options.push(...defauleActions.filter(({ autoShow = false }) => autoShow))
        }
    }
    return options.map(({ disabled = false, show = true, ...opt }) => ({ ...opt, disabled, show }))
  })

  // const emit = defineEmits(actions!.value!.map(({ action }) => action))
</script>

<style scoped></style>
