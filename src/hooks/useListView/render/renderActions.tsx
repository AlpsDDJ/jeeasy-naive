import { h } from 'vue'
import ActionColumn from '@/components/TableExt/components/ActionColumn.vue'
// import { NButton, NSpace } from 'naive-ui'

export function renderActions(actions = true, row: any, index: number) {
  return <ActionColumn actions={actions} row={row} index={index}></ActionColumn>
  //   const actionBtns: any[] = []
  //   switch (typeof actions) {
  //     case 'string':
  //       break
  //     case 'object':
  //       break
  //     default:
  //       if (actions !== false) {
  //         actionBtns.push(defauleActions.map((action) => renderAction(action, row, index)))
  //       } else {
  //         return null
  //       }
  //   }
  //
  //   return <NSpace>{actionBtns}</NSpace>
  //
  //   // return actionColumn
  // }
  //
  // function renderAction(option: ActionOption, row: any, index: number) {
  //   const { btnStyle = 'button', btnType = 'default', text, handle } = option
  //   // const brn = btnType === 'button' ? <n-button></n-button>
  //
  //   return (
  //     <NButton text={btnStyle === 'button'} onClick={() => handle(row, index)} type={btnType}>
  //       {text}
  //     </NButton>
  //   )
}
