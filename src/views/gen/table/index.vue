<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" />
    </template>
    <e-table ref="tableRef" :instance="Model" :query-data="queryData" @show-form="showFormModal">
      <template ##enableFlag="row">
        <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
      </template>
    </e-table>
    <template #bottom>
      <e-form
        ref="formRef"
        v-model:model-value="formData"
        :instance="Model"
        :cols="6"
        :format-form-data="(_formData) => ({ ..._formData, tableFields })"
        @success="loadData()"
      >
        <n-divider />
        <n-tabs v-model:value="activeTab" type="line" animated>
          <n-tab-pane name="db" tab="数据库属性" display-directive="show">
            <e-table v-bind="commonTableProps" :instance="GenTableFieldForDB" :data="tableFields">
              <template ##columnName="row, index">
                <n-input v-model:value="row.columnName" clearable @change="(value) => (tableFields[index].fieldName = camelCase(value))" />
              </template>
            </e-table>
          </n-tab-pane>
          <n-tab-pane name="page" tab="页面属性" display-directive="show">
            <e-table :instance="GenTableFieldForPage" v-bind="commonTableProps" :data="tableFields" />
          </n-tab-pane>
          <n-tab-pane name="rule" tab="校验字段" display-directive="show">
            <e-table :instance="GenTableFieldForRule" v-bind="commonTableProps" :data="tableFields" />
          </n-tab-pane>
          <n-tab-pane name="fk" tab="外键" display-directive="show">
            <e-table :instance="GenTableFieldForFk" v-bind="commonTableProps" :data="tableFields" />
          </n-tab-pane>
          <n-tab-pane name="idx" tab="索引" display-directive="show">
            <e-table :instance="GenTableIndex" :actions="false" :show-page="false" enable-edit :data="tableIndexs" @show-form="handleAddTableIndex" />
          </n-tab-pane>
        </n-tabs>
      </e-form>
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model, { GenTableField, GenTableFieldForDB, GenTableFieldForPage, GenTableFieldForRule, GenTableFieldForFk, GenTableIndex } from './model'
  import { initModel } from '@/components/ext'
  import { ETableProps, ShowForm } from '@/components/ext/types'
  import { camelCase, cloneDeep } from 'lodash-es'

  defineOptions({
    name: 'GenTableList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
  const activeTab = ref<string>('db')

  const tableFields = ref<GenTableFieldForDB[]>([])
  const tableIndexs = ref<GenTableIndex[]>([])
  const showFormModal: ShowForm = (type, formData) => {
    showForm(type, formData)
    tableFields.value = cloneDeep(formData?.tableFields || [])
    tableIndexs.value = cloneDeep(formData?.tableIndexs || [])
  }

  const handleAddTableField = () => {
    console.log('handleAddTableField')
    tableFields.value.push({
      length: 0,
      decimalPlaces: 0,
      allowNull: 1,
      primaryKey: 0
    })
  }

  const handleAddTableIndex = () => {
    console.log('handleAddTableIndex')
    tableIndexs.value.push({
      id: '1'
    })
  }

  const commonTableProps: Omit<ETableProps<GenTableField>, 'instance'> = {
    actions: false,
    showPage: false,
    enableEdit: true,
    onShowForm: handleAddTableField
  }
</script>

<style scoped></style>
