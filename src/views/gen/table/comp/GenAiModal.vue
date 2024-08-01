<script setup lang="ts">
  import GenTable, { GenAiForm, GenTableField } from '@/views/gen/table/model'
  import { useSseChat } from '@/hooks/useAi'
  import { camelCase } from 'lodash-es'
  import { FormInst } from 'naive-ui'

  // const { refs, commProps } = initModel(GenAiForm)
  // const { formRef } = refs
  // const { formProps } = commProps

  const showModal = ref<boolean>(false)
  const formData = ref<GenAiForm>({})
  const formRef = ref<FormInst>()
  const loading = ref<boolean>(false)
  const generateJsonSchema = ref<boolean>(false)

  const show = (tableName?: string) => {
    console.log('show')
    showModal.value = true
    formData.value.tableName = tableName
    // formRef.value?.open(FormTypeEnum.ADD, {
    //   tableName
    // })
  }

  const emits = defineEmits<{
    (e: 'complete', data: GenTable): void
  }>()

  const defTable: GenTable = {
    tableType: 'single',
    dataSource: 'master',
    izSync: 1,
    izSimpleQuery: 1,
    izPage: 1,
    izTree: 0,
    formType: 0
  }

  const defField: GenTableField = {
    jdbcType: 'varchar',
    length: 0,
    decimalPlaces: 0,
    defaultValue: '',
    allowNull: 1,
    javaType: 'String',
    showAdd: 1,
    showEdit: 1,
    showTable: 1,
    disableOnAdd: 0,
    disableOnEdit: 0,
    showSearch: 0,
    formType: 'text',
    required: 0
  }

  const parseJdbcType = (jdbcType: string) => {
    // 正则表达式匹配函数名和参数
    const regex = /^(\w+)(?:\((\d+)(?:,\s*(\d+))?\))?$/
    const match = jdbcType?.toLowerCase().match(regex)

    if (match) {
      return {
        jdbcType: match[1],
        length: match[2] && Number(match[2]),
        decimalPlaces: match[3] && Number(match[3])
      }
    } else {
      // throw new Error('Invalid function string format')
      return {
        jdbcType: jdbcType?.toLowerCase()
      }
    }
  }

  const replaceAiResult = (result: string): GenTable | null => {
    let temp = result.replaceAll('true', '1').replaceAll('false', '0')
    if (temp.startsWith('```')) {
      temp = temp.replaceAll('```', '')
    }
    if (temp.startsWith('json')) {
      temp = temp.substring(4)
    }
    let table: Omit<GenTable, 'tableFields'> & { tableFields: Array<GenTableField & { showName?: string }> }
    try {
      table = JSON.parse(temp)
    } catch (e) {
      window.$dialog.warning({
        title: 'JsonSchema解析失败，需手动merge',
        content: (e as any)?.message
      })
      return null
    }
    table.tableFields = table.tableFields?.map(
      (item) =>
        ({
          ...defField,
          ...item,
          ...parseJdbcType(item.jdbcType ?? ''),
          description: item.showName ?? item.description,
          // jdbcType: item.jdbcType?.toLowerCase(),
          fieldName: camelCase(item.columnName)
        }) as any
    )
    formRef.value?.validate()
    formData.value.tableJson = JSON.stringify({ ...defTable, ...table }, null, 2)
    // formRef.value?.setFormData({
    //   tableJson: JSON.stringify({ ...defTable, ...table }, null, 2)
    // })
    return { ...defTable, ...table } as GenTable
  }

  const handleSubmit = async () => {
    emits('complete', JSON.parse(formData.value.tableJson || '{}'))
    close()
    return false
  }

  const close = () => {
    // formRef.value?.close()
    showModal.value = true
  }

  const generateTableStructureByAi = async () => {
    const { tableName, tableDesc } = formData.value
    if (!tableName && !tableDesc) {
      window.$message.warning('至少给个提示啊！')
      return
    }
    generateJsonSchema.value = false
    const { open, onMsg, results } = useSseChat()
    onMsg((result) => {
      console.log(result)
      formData.value.tableDesc = result
      // formRef.value?.setFormData({
      //   tableDesc: result
      // })
    })
    await open({
      content: tableDesc ?? `设计一个表结构，表名为：${tableName}`,
      appCode: 'code-pm'
    })
    console.log('完成: ', results.value)
  }

  const generateTableJsonByAi = async () => {
    const { tableName, tableDesc } = formData.value
    if (!tableName && !tableDesc) {
      window.$message.warning('至少给个提示啊！')
      return
    }
    generateJsonSchema.value = true
    const { open, onMsg, results } = useSseChat()
    onMsg((result) => {
      console.log(result)
      formData.value.tableJson = result
      // formRef.value?.setFormData({
      //   tableJson: result
      // })
    })
    await open({
      content: tableDesc ?? '',
      appCode: 'code-dba',
      params: {
        tableName: tableName,
        dbType: 'MySql'
      }
    })
    replaceAiResult(results.value)
    // console.log('完成: ', results.value)
  }

  defineExpose<{
    show: (tableName?: string) => void
    close: () => void
  }>({
    show,
    close
  })
</script>

<template>
  <!--<e-form ref="formRef" v-bind="formProps" :cols="4" :before-submit="handleSubmit" title="Ai 编码助手" ok-btn="确认">
    <n-button round secondary type="success" class="ai-action-btn" @click="generateTableStructureByAi">
      <template #icon>
        <Icon icon-name="InfiniteOutline" />
      </template>
      功能分析
    </n-button>
    <n-button round secondary type="success" class="ai-action-btn" @click="generateTableJsonByAi">
      <template #icon>
        <Icon icon-name="InfiniteOutline" />
      </template>
      生成数据
    </n-button>
    <template #bottom>11 </template>
  </e-form>-->
  <n-modal v-model:show="showModal" size="70%" title="Ai 编码助手">
    <n-card style="width: 75%" title="模态框" size="huge" :bordered="false" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="formData" label-placement="left" label-width="80">
        <n-grid>
          <n-form-item-gi label="表名" path="tableName" span="13">
            <n-input v-model:value="formData.tableName" type="textarea" style="white-space: pre-wrap" rows="2" @keyup.enter="generateTableStructureByAi">
              <template #suffix>
                <n-button circle quaternary type="success" class="ai-action-btn" :loading="loading" @click="generateTableStructureByAi">
                  <template #icon>
                    <Icon icon-name="InfiniteOutline" />
                  </template>
                </n-button>
              </template>
            </n-input>
          </n-form-item-gi>
        </n-grid>
        <n-grid>
          <n-form-item-gi label="功能描述" path="tableDesc" span="13">
            <n-input v-model:value="formData.tableDesc" type="textarea" style="white-space: pre-wrap" :rows="35" @keyup.enter="generateTableJsonByAi">
              <template #suffix>
                <n-button circle quaternary type="success" class="ai-action-btn" :loading="loading" @click="generateTableJsonByAi">
                  <template #icon>
                    <Icon icon-name="InfiniteOutline" />
                  </template>
                </n-button>
              </template>
            </n-input>
          </n-form-item-gi>
          <n-form-item-gi label="生成结果" path="tableJson" span="9" offset="1">
            <n-input v-model:value="formData.tableJson" type="textarea" style="white-space: pre-wrap" :rows="35" @keyup.enter="handleSubmit" />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-button secondary type="success" class="ai-action-btn" :loading="loading" @click="handleSubmit"> 确认 </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
