<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showForm">
      <template ##enableFlag="row">
        <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-model:model-value="formData" :instance="Model" :cols="6" @success="loadData()">
        <n-divider />
        <n-tabs type="line" animated>
          <n-tab-pane name="db" tab="数据库属性"> 数据库属性 </n-tab-pane>
          <n-tab-pane name="page" tab="页面属性"> 页面属性 </n-tab-pane>
          <n-tab-pane name="rule" tab="校验字段"> 校验字段 </n-tab-pane>
          <n-tab-pane name="fk" tab="外键"> 外键 </n-tab-pane>
          <n-tab-pane name="idx" tab="索引"> 索引 </n-tab-pane>
          <n-tab-pane name="customSearch" tab="个性查询配置"> 个性查询配置 </n-tab-pane>
        </n-tabs>
      </e-form>
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'GenTableList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
</script>

<style scoped></style>
