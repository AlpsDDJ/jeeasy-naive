<template>
  <div class="list-view">
    <div class="data-table-query">
      <n-card>
        <slot name="query" />
      </n-card>
    </div>
    <div class="data-table-content">
      <n-card>
        <slot />
        <slot name="table" />
      </n-card>
    </div>
    <slot name="form" />
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'
  import { EModelProps } from './types'

  defineOptions({
    name: 'EModel'
  })
  defineProps<EModelProps<T>>()
  defineSlots<{
    default?: (props?: {}) => any
    query?: (props?: {}) => any
    form?: (props?: {}) => any
    table?: (props?: {}) => any
  }>()
</script>

<style scoped lang="less"></style>
