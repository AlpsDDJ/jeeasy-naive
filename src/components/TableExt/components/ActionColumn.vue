<template>
  <n-space>
    <n-button
      v-for="{ action, btnStyle = 'button', btnType = 'default', text, handle } in actionOption"
      :key="action"
      :text="btnStyle === 'button'"
      :type="btnType"
      @click="handle ? handle(row, index) : $emit(`action:${action}`, row, index)"
    >
      {{ text }}
    </n-button>
  </n-space>
</template>

<script lang="ts" setup name="ActionColumn">
  import { isNotNull } from '@/utils/tools'
  import { indexOf } from 'lodash'

  type ButonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
  type ActionType = 'edit' | 'delete' | 'view' | 'add' | string

  type ActionOption = {
    action: ActionType
    btnType?: ButonType
    btnStyle?: 'button' | 'link'
    icon?: string
    autoShow?: boolean
    text: string
    handle?: (row: any, index: number) => void
  }

  // function actionHandle(action, row, index) {}

  const defauleActions: ActionOption[] = [
    {
      action: 'view',
      text: '查看',
      // btnType: 'primary',
      autoShow: true,
      handle: (row, index) => {
        console.log(`action edit row${index}:`, row)
      }
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
      autoShow: true,
      handle: (row, index) => {
        console.log(`action delete row${index}:`, row)
      }
    }
  ]

  type ActionColumnProps = {
    actions?: ActionOption[] | ActionType[] | boolean
    row: any
    index: number
  }
  const props = defineProps<ActionColumnProps>()
  const { actions = ref(true), row, index } = toRefs(props)
  console.log('actions ---> ', actions.value)
  const actionOption = computed(() => {
    // const options: ActionOption[] = []

    switch (typeof actions.value) {
      case 'object':
        if (isNotNull(actions.value)) {
          if (typeof actions.value[0] === 'string') {
            return defauleActions.filter(({ action }) => indexOf(actions.value as ActionType[], action))
          } else {
            return actions.value
          }
        }
        break
      default:
        if (actions.value !== false) {
          return defauleActions.filter(({ autoShow = false }) => autoShow)
        }
    }
    return []
  })

  // const emit = defineEmits(actions!.value!.map(({ action }) => action))
</script>

<style scoped></style>
