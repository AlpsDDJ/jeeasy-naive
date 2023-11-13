<template>
  <div class="list-view">
    <div class="data-table-query">
      <n-card>
        <slot name="top" />
      </n-card>
    </div>
    <div class="data-table-content">
      <n-card>
        <slot />
      </n-card>
    </div>
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
  import { BaseModel } from '@/hooks/useModel'

  defineOptions({
    name: 'EModel'
  })

  defineSlots<{
    top?: (props?: {}) => any
    default?: (props?: {}) => any
    bottom?: (props?: {}) => any
  }>()
</script>

<style scoped lang="less"></style>
