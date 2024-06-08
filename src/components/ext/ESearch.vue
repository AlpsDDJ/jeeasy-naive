<template>
  <n-form ref="nFormRef" v-bind="{ ...defaultFormProps, ...formProps }" :model="queryData" label-placement="left" :show-feedback="false" inline>
    <n-grid :cols="cols" :y-gap="8" :x-gap="12" :collapsed="queryCollapsed">
      <n-form-item-gi v-for="item in queryScheme" :key="item.path || item.key" :label="item.label">
        <component :is="createInpComp(item)" v-model="queryData[item.path || item.key || '']" />
      </n-form-item-gi>
      <n-form-item-gi suffix class="query-action">
        <action-button :actions="['query', 'reset']" @action:query="loadData" @action:reset="resetHandle">
          <n-button text type="primary" icon-placement="right" @click="queryCollapsed = !queryCollapsed">
            {{ queryCollapsed ? '展开' : '收起' }}
            <template #icon>
              <n-icon>
                <icon :icon-name="queryCollapsed ? 'ChevronDown' : 'ChevronUp'" />
              </n-icon>
            </template>
          </n-button>
        </action-button>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts" generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import type { EQueryProps, EQueryInst } from './types'
  import { createInputComponent } from '@/components/ext/index'
  import { appSetting } from '@/config/app.config'
  import type { FormInst, FormProps } from 'naive-ui'
  import { cloneDeep } from 'lodash-es'
  import { FormTypeEnum } from 'easy-descriptor'
  import type { FieldOption, IFormData } from 'easy-descriptor'

  defineOptions({
    name: 'ESearch'
    // inheritAttrs: true,
    // extends: NForm
  })

  const defaultFormProps: FormProps = {
    size: appSetting.formSize
  }

  const props = withDefaults(defineProps<EQueryProps<T>>(), {
    autoQuery: true,
    resetAndQuery: true,
    formProps: () => ({
      size: appSetting.formSize
    }),
    defaultData: () => ({})
  })

  console.log('props.formProps -->  ', props.formProps)

  const nFormRef = defineModel<FormInst>('nFormRef')
  const modelState = props.modelOptions

  const cols = ref<string>('1 600:2 900:3 1200:4 1500:5')
  const queryData = ref<IFormData<T>>()
  const queryCollapsed = defineModel<boolean>('collapsed', { default: true })
  const queryScheme = computed<FieldOption<T>[]>(() =>
    Object.values(modelState.fields || []).filter(({ hidden }) => !(hidden === true || (hidden && hidden?.includes('query'))))
  )

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, queryData, FormTypeEnum.SEARCH)
  }

  const resetHandle = () => {
    props.defaultData && (queryData.value = cloneDeep(props.defaultData))
    props.resetAndQuery &&
      nextTick().then(() => {
        props.loadData()
      })
  }

  defineExpose<EQueryInst<T>>({
    getFormData: () => queryData.value as IFormData<T>,
    query: (params?: any) => props.loadData(params),
    reset: resetHandle
  })

  onMounted(() => {
    props.defaultData && (queryData.value = cloneDeep(props.defaultData))
    // tableRef.value!.page(2)
    // props.autoQuery && props.loadData(props.defaultData || {})
  })
</script>

<style scoped lang="less"></style>
