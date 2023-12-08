<template>
  <component :is="component" v-bind="{ ...compProps, ...$attrs }" v-model:value="modelValue">
    <template v-if="props.showSwitchText" #checked> {{ optionMap[1] }} </template>
    <template v-if="props.showSwitchText" #unchecked> {{ optionMap[0] }} </template>
  </component>
</template>

<script setup lang="ts">
  import { CommonApi } from '@/api/common'
  import { DictData, DictInputProps, DictInputValues } from './types'
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

  const options = ref<DictData[]>()
  const optionMap = ref({})

  const component = ref<any>()
  const compProps = ref({})

  const loadData = (params = {}) => {
    return new Promise<DictData[]>((resolve) => {
      CommonApi.getDicts({
        code: props.code,
        parentId: props.topPid,
        async: props.async,
        ...params
      }).then((resp) => {
        resolve(resp.data?.map(({ leaf, ...item }) => ({ isLeaf: leaf, ...item })))
      })
    })
  }

  const loadChildren = async (option?: any) => {
    option.children = await loadData({
      parentId: option.dictCode
    })
    // return new Promise<void>((resolve) => {
    //   CommonApi.getDicts({
    //     code: props.code,
    //     parentId: option.dictCode,
    //     async: props.async
    //   }).then((resp) => {
    //     option.children = resp.data
    //     resolve()
    //   })
    // })
  }

  switch (props.component) {
    case 'treeSelect':
      component.value = markRaw(NTreeSelect)
      compProps.value = {
        options,
        cascade: true,
        multiple: props.multiple,
        checkable: props.multiple,
        labelField: 'dictName',
        keyField: 'dictCode',
        childrenField: 'children',
        onLoad: loadChildren
      }
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
  onMounted(async () => {
    const data = await loadData()
    options.value = data
    data.forEach((item) => {
      optionMap.value[item.dictCode] = item.dictName
    })
  })
</script>

<style scoped></style>
