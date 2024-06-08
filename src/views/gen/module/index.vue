<template>
  <e-model>
    <template #top>
      <e-search ref="queryRef" v-bind="queryProps" />
    </template>
    <e-table ref="tableRef" v-bind="tableProps">
      <!--<template ##enableFlag="row">
        <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
      </template>-->
    </e-table>
    <template #bottom>
      <e-form ref="formRef" v-bind="formProps" :cols="2" :defaule-data="defaultData" />
    </template>
  </e-model>
</template>

<script lang="ts" setup>
  import Model from './model'
  import { initModel } from '@/components/ext'

  defineOptions({
    name: 'GenModuleList'
  })
  const defaultData: Model = {
    pkg: 'org.jeeasy',
    entity: 'domain',
    mapper: 'mapper',
    mapperXml: 'mapper.xml',
    service: 'service',
    serviceImpl: 'service.impl',
    controller: 'controller'
  }

  const { refs, commProps } = initModel(Model)
  const { tableRef, formRef, queryRef } = refs
  const { tableProps, formProps, queryProps } = commProps
</script>

<style scoped></style>
