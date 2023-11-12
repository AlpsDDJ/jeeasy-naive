<template>
  <n-form ref="formRef" :model="queryData" label-placement="left" :show-feedback="false" inline label-width="auto">
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
  import type { ExtQueryInst, ExtQueryProps, QueryData } from './types'
  import { createInputComponent } from '@/components/ext/index'
  import { appSetting } from '@/config/app.config'
  import type { FormInst } from 'naive-ui'
  import type { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import { cloneDeep } from 'lodash-es'

  defineOptions({
    name: 'ExtQuery'
  })
  const formRef = ref<FormInst>()

  const cols = ref('1 600:2 900:3 1200:4 1500:5')

  const props = withDefaults(defineProps<ExtQueryProps<T>>(), {
    size: appSetting.formSize,
    autoQuery: true,
    resetAndQuery: true
  })

  const queryData = defineModel<QueryData<T>>({
    local: true,
    default: {}
  })
  if (props.defauleData) {
    queryData.value = cloneDeep(props.defauleData)
  }
  // const queryData = ref<QueryData<T>>({})
  const queryCollapsed = defineModel<boolean>('collapsed', { local: true, default: true })

  // const modelState = ref<ModelState<T>>(useModel<T>(props.instance))
  const queryScheme = computed<FieldOption<T>[]>(() =>
    Object.values(useModel<T>(props.instance)?.fields || []).filter(({ hidden }) => !(hidden === true || hidden?.includes('query')))
  )

  const createInpComp = (field: FieldOption<T>) => {
    return createInputComponent<T>(field, queryData, true)
  }

  const resetHandle = () => {
    queryData.value = {}
    props.resetAndQuery &&
      nextTick().then(() => {
        props.loadData()
      })
  }

  /**
   * 对外暴漏表单方法
   */
  const expose: ExtQueryInst<T> = {
    restoreValidation: () => {
      formRef.value!.restoreValidation()
    },
    validate: (callback?: FormValidateCallback, shouldRuleBeApplied?: ShouldRuleBeApplied) => {
      return formRef.value!.validate(callback, shouldRuleBeApplied)
    },
    query: (params?: any) => props.loadData(params),
    reset: resetHandle
  }

  defineExpose<ExtQueryInst<T>>({
    ...expose
  })

  onMounted(() => {
    // tableRef.value!.page(2)
    props.autoQuery && props.loadData()
  })
</script>

<style scoped lang="less"></style>
