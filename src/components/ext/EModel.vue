<template>
  <div class="list-view">
    <div class="data-table-query">
      <n-card>
        <slot name="top">
          <e-search ref="queryRef" v-bind="queryProps!" />
        </slot>
      </n-card>
    </div>
    <div class="data-table-content">
      <n-card>
        <slot>
          <e-table ref="tableRef" v-bind="tableProps!">
            <template v-for="(_, key) in $slots" :key="key" #[key]="slotProps">
              <slot v-if="key.toString().startsWith('#')" :name="key" v-bind="slotProps" />
            </template>
          </e-table>
        </slot>
      </n-card>
    </div>
    <slot name="bottom">
      <e-form ref="formRef" v-bind="formProps!" />
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import { EModelProps } from '@/components/ext/types'

  defineOptions({
    name: 'EModel'
  })

  const props = withDefaults(defineProps<EModelProps>(), {})
  const { queryRef, formRef, tableRef } = props.refs || {}
  const { queryProps, tableProps, formProps } = props.commProps || {}

  defineSlots<{
    top?: (props?: {}) => any
    default?: (props?: {}) => any
    bottom?: (props?: {}) => any
  }>()
</script>

<style scoped lang="less"></style>
