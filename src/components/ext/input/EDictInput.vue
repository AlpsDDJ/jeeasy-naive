<template>
  <component :is="inputComponent" v-bind="{ ...compProps, ...$attrs }" v-model:value="modelValue">
    <template v-if="props.showSwitchText" #checked> {{ optionMap[1] }} </template>
    <template v-if="props.showSwitchText" #unchecked> {{ optionMap[0] }} </template>
    <n-space v-if="component === 'checkbox'">
      <n-checkbox v-for="opt in options" :key="opt.dictCode" :value="opt.dictCode" :label="opt.dictName" />
    </n-space>
  </component>
</template>

<script setup lang="ts">
  import { CommonApi } from '@/api/common'
  import { DictData, DictInputProps, DictInputValues } from './types'
  import { NCheckbox, NCheckboxGroup, NSelect, NSwitch, NTree, NTreeSelect } from 'naive-ui'
  import { useCacheStore } from '@/store/modules/cache'

  defineOptions({
    name: 'EDictInput'
  })

  const props = withDefaults(defineProps<DictInputProps>(), {
    multiple: false,
    component: 'select',
    showSwitchText: false
  })

  const modelValue = defineModel<DictInputValues>('value')

  const options = ref<DictData[]>()
  const optionMap = ref({})

  const inputComponent = ref<any>()
  const compProps = ref({})
  const cacheStore = useCacheStore()

  const loadData = (params = {}) => {
    console.log('props.queryParams --->> ', props.queryParams)
    const _params = {
      code: props.code,
      parentId: props.topPid,
      async: props.async,
      ...props.queryParams,
      ...params
    }
    const cacheKey = `dict_${Object.values(_params).join('$$')}`
    const cacheValue = cacheStore.getValue(cacheKey)
    if (cacheValue) {
      return Promise.resolve(cacheValue)
    } else {
      return new Promise<DictData[]>((resolve) => {
        CommonApi.getDicts(_params).then((resp) => {
          const value = resp.data?.map(({ leaf, ...item }) => ({ isLeaf: leaf, ...item }))
          cacheStore.setValue(cacheKey, value)
          resolve(value)
        })
      })
    }
  }

  const loadChildren = async (option?: any) => {
    option.children = await loadData({
      parentId: option.dictCode
    })
  }

  switch (props.component) {
    case 'treeSelect':
      inputComponent.value = markRaw(NTreeSelect)
      compProps.value = {
        options,
        // cascade: true,
        multiple: props.multiple,
        checkable: props.multiple,
        labelField: 'dictName',
        keyField: 'dictCode',
        childrenField: 'children',
        onLoad: loadChildren
      }
      break
    case 'tree':
      inputComponent.value = markRaw(NTree)
      compProps.value = {
        data: options,
        selectable: !props.multiple,
        blockNode: !props.multiple,
        // cascade: true,
        multiple: props.multiple,
        checkable: props.multiple,
        labelField: 'dictName',
        keyField: 'dictCode',
        childrenField: 'children',
        selectedKeys: props.multiple ? undefined : modelValue,
        checkedKeys: props.multiple ? modelValue : undefined,
        'onUpdate:checked-keys': (keys: DictInputValues) => {
          console.log('keys ---> ', keys)
          modelValue.value = keys
        },
        onLoad: loadChildren
      }
      break
    case 'checkbox':
      inputComponent.value = markRaw(NCheckboxGroup)
      break
    case 'radio':
      inputComponent.value = markRaw(NCheckbox)
      break
    case 'switch':
      inputComponent.value = markRaw(NSwitch)
      compProps.value = {
        checkedValue: 1,
        uncheckedValue: 0
      }
      break
    default:
      inputComponent.value = markRaw(NSelect)
      compProps.value = {
        options,
        multiple: props.multiple,
        labelField: 'dictName',
        valueField: 'dictCode'
      }
      break
  }

  export interface EDictInputInst {
    options: DictData[]
  }

  defineExpose<EDictInputInst>({
    options: options.value || []
  })

  const emits = defineEmits<{
    (e: 'show', value?: DictInputValues, options?: DictData[]): void
  }>()

  // const component = props.component
  onMounted(async () => {
    const data = await loadData()
    options.value = data
    data.forEach((item) => {
      optionMap.value[item.dictCode] = item.dictName
    })
    emits('show', modelValue.value, options.value)
  })
</script>

<style scoped></style>
