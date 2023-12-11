<template>
  <n-form ref="formRef" v-bind="props.formProps" :model="queryData" label-placement="left" :show-feedback="false" inline label-width="auto">
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
  import type { EQueryInst, EQueryProps, FormData } from './types'
  import { createInputComponent } from '@/components/ext/index'
  import { appSetting } from '@/config/app.config'
  import type { FormInst } from 'naive-ui'
  import type { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import { cloneDeep } from 'lodash-es'

  defineOptions({
    name: 'ESearch'
    // inheritAttrs: true,
    // extends: NForm
  })
  const formRef = ref<FormInst>()

  const props = withDefaults(defineProps<EQueryProps<T>>(), {
    size: 'medium',
    autoQuery: true,
    resetAndQuery: true,
    formProps: () => ({
      size: appSetting.formSize
    }),
    defaultData: {}
  })

  const cols = ref('1 600:2 900:3 1200:4 1500:5')
  const queryData = defineModel<FormData<T>>({
    local: true,
    default: {}
  })
  // const queryData = ref<QueryData<T>>({})
  const queryCollapsed = defineModel<boolean>('collapsed', { local: true, default: true })

  // const modelState = ref<ModelState<T>>(useModel<T>(props.instance))
  const queryScheme = computed<FieldOption<T>[]>(() =>
    Object.values(useModel<T>(props.instance)?.fields || []).filter(({ hidden }) => !(hidden === true || (hidden && hidden?.includes('query'))))
  )

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, queryData, FormType.SEARCH)
  }

  const resetHandle = () => {
    queryData.value = cloneDeep(props.defauleData || {})
    props.resetAndQuery &&
      nextTick().then(() => {
        props.loadData()
      })
  }

  /**
   * 对外暴漏表单方法
   */
  const expose: EQueryInst<T> = {
    restoreValidation: () => {
      formRef.value!.restoreValidation()
    },
    validate: (callback?: FormValidateCallback, shouldRuleBeApplied?: ShouldRuleBeApplied) => {
      return formRef.value!.validate(callback, shouldRuleBeApplied)
    },
    query: (params?: any) => props.loadData(params),
    reset: resetHandle
  }

  defineExpose<EQueryInst<T>>({
    ...expose
  })

  onMounted(() => {
    if (props.defauleData) {
      queryData.value = cloneDeep(props.defauleData)
    }
    // tableRef.value!.page(2)
    props.autoQuery && props.loadData(props.defauleData || {})
  })
</script>

<style scoped lang="less"></style>
