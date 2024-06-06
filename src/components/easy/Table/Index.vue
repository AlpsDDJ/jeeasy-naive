<!--<script setup lang="ts" generic="T extends BaseModel">-->
<!--  import ActionButton from '@/components/ActionButton/index.vue'-->
<!--  import { PaginationProps, tableProps } from 'naive-ui'-->
<!--  import { FormType, FormTypeEnum, IFormData } from 'easy-descriptor'-->
<!--  import { BaseModel } from '@/hooks/useModel'-->
<!--  import { ETableProps } from '@/components/ext/types'-->
<!--  import { ActionOption } from '@/components/ActionButton/commonActions'-->

<!--  defineOptions({ name: 'EzTable' })-->

<!--  const props = withDefaults(defineProps<ETableProps<T>>(), {-->
<!--    actions: 'default',-->
<!--    tableProps: () => ({}),-->
<!--    beforeQuery: (queryData: any) => queryData,-->
<!--    data: () => [],-->
<!--    showPage: true,-->
<!--    enableEdit: false-->
<!--  })-->

<!--  const emit = defineEmits<{-->
<!--    (evt: 'showForm', type: FormType, formData: IFormData<T>): void-->
<!--    (evt: 'pageChange', page: PaginationProps | false): void-->
<!--  }>()-->

<!--  const showForm = (formData: any, type: FormType) => {-->
<!--    emit('showForm', type, formData)-->
<!--  }-->

<!--  const handleAdd = () => {-->
<!--    showForm({}, FormTypeEnum.ADD)-->
<!--  }-->
<!--  const handleDelete = ({ row, index }) => {-->
<!--    console.log(`删除第${index} 行，id = ${row.id}`)-->
<!--  }-->
<!--  const handleEdit = ({ row, index }) => {-->
<!--    console.log(`编辑第${index} 行，id = ${row.id}`)-->
<!--    showForm(row, FormTypeEnum.EDIT)-->
<!--  }-->

<!--  const defaultActions: ActionOption[] = [-->
<!--    {-->
<!--      action: 'edit',-->
<!--      html: '编辑',-->
<!--      text: true,-->
<!--      type: 'primary',-->
<!--      isDisabled: true,-->
<!--      autoShow: true,-->
<!--      handle: handleEdit-->
<!--    },-->
<!--    {-->
<!--      action: 'delete',-->
<!--      html: '删除',-->
<!--      text: true,-->
<!--      type: 'error',-->
<!--      autoShow: true,-->
<!--      handle: handleDelete-->
<!--    }-->
<!--  ]-->
<!--</script>-->

<!--<template>-->
<!--  <n-space vertical>-->
<!--    <slot name="toolBar">-->
<!--      <action-button :actions="['add']" @action:add="handleAdd" />-->
<!--    </slot>-->
<!--    <n-config-provider :theme-overrides="enableEdit ? editTableThemeOverrides : {}">-->
<!--      <n-form ref="tableEditFormRef" :model="tableData" :show-label="false" inline :show-feedback="false">-->
<!--        <n-data-table-->
<!--          ref="tableRef"-->
<!--          v-bind="tableProps"-->
<!--          :columns="columns"-->
<!--          :loading="loading"-->
<!--          :data="tableData"-->
<!--          :pagination="showPage && pagination"-->
<!--          :remote="true"-->
<!--          :tree="!!treeField"-->
<!--          @update:page="-->
<!--            (page) => {-->
<!--              pageChangeHandle({ page })-->
<!--            }-->
<!--          "-->
<!--          @update:page-size="-->
<!--            (pageSize) => {-->
<!--              pageChangeHandle({ pageSize })-->
<!--            }-->
<!--          "-->
<!--        >-->
<!--          <template v-if="$slots.loading" #loading>-->
<!--            <slot name="loading" />-->
<!--          </template>-->
<!--          <template v-if="$slots.empty" #empty>-->
<!--            <slot name="empty" />-->
<!--          </template>-->
<!--        </n-data-table>-->
<!--      </n-form>-->
<!--    </n-config-provider>-->
<!--  </n-space>-->
<!--</template>-->

<!--<style scoped></style>-->
