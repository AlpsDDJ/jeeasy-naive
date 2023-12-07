<template>
  <component :is="component" v-bind="{ ...compProps, ...$attrs }" v-model:value="modelValue">
    <template v-if="props.showSwitchText" #checked> {{ optionMap[1] }} </template>
    <template v-if="props.showSwitchText" #unchecked> {{ optionMap[0] }} </template>
  </component>
</template>

<script setup lang="ts">
  import { CommonApi } from '@/api/common'
  import { DictInputProps, DictInputValues } from './types'
  import { NCheckbox, NTreeSelect, NSelect, NSwitch } from 'naive-ui'

  defineOptions({
    name: 'EDictInput'
  })

  const props = withDefaults(defineProps<DictInputProps>(), {
    multiple: false,
    component: 'select',
    showSwitchText: true
  })

  const modelValue = defineModel<DictInputValues>('value')

  const options = ref([])
  const optionMap = ref({})

  const component = ref<any>()
  const compProps = ref({})

  switch (props.component) {
    case 'treeSelect':
      component.value = markRaw(NTreeSelect)
      break
    case 'checkbox':
      component.value = markRaw(NCheckbox)
      break
    case 'radio':
      component.value = markRaw(NCheckbox)
      break
    case 'switch':
      component.value = markRaw(NSwitch)
      compProps.value = {
        checkedValue: 1,
        uncheckedValue: 0
      }
      break
    default:
      component.value = markRaw(NSelect)
      compProps.value = {
        options,
        multiple: props.multiple,
        labelField: 'dictName',
        valueField: 'dictCode'
      }
      break
  }
  // const component = props.component
  onMounted(() => {
    CommonApi.getDicts({
      code: props.code
    }).then((resp) => {
      // console.log('resp ---> ', resp)
      options.value = resp.data
      resp.data.forEach((item) => {
        optionMap.value[item.dictCode] = item.dictName
      })
    })
  })
</script>

<style scoped></style>
