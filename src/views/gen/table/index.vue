<template>
  <div>
    <e-model>
      <template #top>
        <e-search ref="queryRef" v-bind="queryProps" />
      </template>
      <e-table ref="tableRef" v-bind="tableProps" :actions="rowActions">
        <template #toolBarEnd>
          <n-button secondary type="success" @click="genAiModalRef.show()">
            <template #icon>
              <Icon icon-name="InfiniteOutline" />
            </template>
            AI建表
          </n-button>
        </template>
        <template ##enableFlag="row">
          <n-tag :type="row.enableFlag ? 'success' : 'warning'" :bordered="false">{{ row.enableFlag_dict }}</n-tag>
        </template>
      </e-table>
      <template #bottom>
        <e-form ref="formRef" v-bind="formProps" :cols="6" :before-submit="beforeSubmit" :format-form-data="formatFormData">
          <n-divider />
          <n-tabs v-model:value="activeTab" type="line" animated>
            <n-tab-pane name="db" tab="数据库属性" display-directive="show">
              <e-table ref="dbTableRef" v-bind="dbTableProps" :data="tableFields" data-key="columnName">
                <template ##columnName="row, index">
                  <n-auto-complete
                    v-model:value="row.columnName"
                    :input-props="{
                      autocomplete: 'disabled'
                    }"
                    :options="columnNameOptions(index)"
                    clearable
                    @change="
                      (event: Event) => {
                        columnNameChangeHandle(event, index)
                      }
                    "
                  />
                </template>
              </e-table>
            </n-tab-pane>
            <n-tab-pane name="page" tab="页面属性" display-directive="show">
              <e-table ref="pageTableRef" v-bind="pageTableProps" :data="tableFields" data-key="columnName" />
            </n-tab-pane>
            <n-tab-pane name="rule" tab="校验字段" display-directive="show">
              <e-table ref="ruleTableRef" v-bind="ruleTableProps" :data="tableFields" data-key="columnName" />
            </n-tab-pane>
            <n-tab-pane name="fk" tab="外键" display-directive="show">
              <e-table ref="fkTableRef" v-bind="fkTableProps" :data="tableFields" data-key="columnName" />
            </n-tab-pane>
            <n-tab-pane name="idx" tab="索引" display-directive="show">
              <e-table ref="idxTableRef" v-bind="idxTableProps" :data="tableIndexs" data-key="columnName" />
            </n-tab-pane>
          </n-tabs>
        </e-form>
      </template>
    </e-model>
    <e-form ref="mFormRef" v-bind="mFormProps" :before-submit="handleGenSubmit" ok-btn="预览">
      <n-form-item label="生成文件">
        <e-dict-input v-model:value="checkedFileTypes" component="checkbox" multiple code="#gen_template" :query-params="{ templateType: 'default' }" />
        <!--<n-checkbox-group v-model:value="checkedFileTypes">
          <n-space>
            <n-checkbox label="Entity" value="entity" />
            <n-checkbox label="Mapper" value="mapper" />
            <n-checkbox label="MapperXml" value="mapperXml" />
            <n-checkbox label="Service" value="service" />
            <n-checkbox label="ServiceImpl" value="serviceImpl" />
            <n-checkbox label="Controller" value="controller" />
            <n-checkbox label="WebList" value="webList" />
            <n-checkbox label="WebModel" value="webModel" />
          </n-space>
        </n-checkbox-group>-->
      </n-form-item>
      <template #bottom>
        <n-form-item label-placement="left" label="模板选择" :show-feedback="false">
          <e-dict-input
            code="#gen_module"
            style="width: 200px"
            @update:value="handleGenModuleTempChange"
            @show="
              (_, opts) => {
                console.log('opts ---> ', opts)
                const { dictCode: modelId } = opts?.findLast(({ dictCode }) => currTable?.name?.indexOf(`${dictCode}_`) === 0) || {}
                modelId && handleGenModuleTempChange(modelId)
              }
            "
          />
        </n-form-item>
      </template>
    </e-form>
    <gen-ai-modal ref="genAiModalRef" @complete="onAiComplete" />
    <gen-preview ref="genPreviewRef" />
  </div>
</template>

<script lang="ts" setup>
  import Model from './model'
  import GenTable, {
    GeneratorApi,
    GenTableField,
    GenTableFieldForDB,
    GenTableFieldForFk,
    GenTableFieldForPage,
    GenTableFieldForRule,
    GenTableIndex
  } from './model'
  import { initModel } from '@/components/ext'
  import { EModelCommProps, FormatFormData } from '@/components/ext/types'
  import { camelCase, cloneDeep, snakeCase, uniqueId, upperFirst } from 'lodash-es'
  import { ButtonActions } from '@/components/ActionButton/commonActions'
  import GenModule, { GeneratorData, GeneratorFile, GenModuleApi } from '@/views/gen/module/model'
  import type { IFormData } from 'easy-descriptor'
  import { FormTypeEnum } from 'easy-descriptor'
  import { commonFields } from '@/views/gen/table/commonFields'
  import GenAiModal from './comp/GenAiModal.vue'
  import GenPreview from '@/views/gen/table/comp/GenPreview.vue'

  defineOptions({
    name: 'GenTableList'
  })

  const activeTab = ref<string>('db')

  const tableFields = ref<GenTableField[]>([])
  const tableIndexs = ref<GenTableIndex[]>([])

  const genAiModalRef = ref()
  const genPreviewRef = ref()

  const columnNameOptions = computed(() => (rowIndex: number) => {
    const name = tableFields.value[rowIndex].columnName
    return commonFields
      .map(({ columnName }) => ({ label: columnName, value: columnName }))
      .filter(
        ({ value }) =>
          name && value?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && !tableFields.value.some(({ columnName }) => columnName === value)
      )
  })

  const columnNameChangeHandle = (event: Event, rowIndex: number) => {
    const intputElement = event.target as HTMLInputElement
    const value = intputElement.value
    if (commonFields.some(({ columnName }) => columnName === value)) {
      tableFields.value[rowIndex] = commonFields.find(({ columnName }) => columnName === value)!
    } else {
      tableFields.value[rowIndex].fieldName = camelCase(value)
      tableFields.value[rowIndex].columnName = snakeCase(value)
    }
  }

  const tempIdPrefix = 'tmp_'

  const beforeSubmit: FormatFormData<Model> = async (formData) => {
    activeTab.value = 'db'
    return {
      ...formData,
      tableFields: tableFields.value.map(({ id, ...fields }) => ({ ...fields, id: id?.startsWith(tempIdPrefix) ? undefined : id })),
      tableIndexs: tableIndexs.value.map(({ id, ...indexs }) => ({ ...indexs, id: id?.startsWith(tempIdPrefix) ? undefined : id }))
    }
  }
  const formatFormData: FormatFormData<Model> = async (formData) => {
    activeTab.value = 'db'
    tableFields.value = cloneDeep(formData?.tableFields || [])
    tableIndexs.value = cloneDeep(formData?.tableIndexs || [])
    return { ...formData, tableFields: tableFields.value, tableIndexs: tableIndexs.value }
  }

  const {
    refs: { tableRef, formRef, queryRef },
    commProps: { tableProps, formProps, queryProps }
  } = initModel(Model)

  const handleAddTableField = (formData: IFormData<GenTableFieldForDB>) => {
    tableFields.value.push({
      id: uniqueId(tempIdPrefix),
      ...formData,
      length: 0,
      decimalPlaces: 0,
      allowNull: 1,
      primaryKey: 0
    })
  }

  const onAiComplete = async (data: GenTable) => {
    console.log('data --------------->>>>>>>>> ', data)
    formRef.value?.open(FormTypeEnum.ADD)
    await nextTick()
    const { tableFields: _tableFields = [], ...genTable } = data
    tableFields.value.push(
      ..._tableFields
        .filter(({ columnName }) => !tableFields.value.some((item) => columnName === item.columnName))
        .map((item) => ({ id: uniqueId(tempIdPrefix), ...item }))
    )
    formRef.value?.setFormData(genTable)
  }

  const handleAddTableIndex = (formData: IFormData<GenTableIndex>) => {
    console.log('handleAddTableIndex')
    tableIndexs.value.push({
      ...formData,
      id: '1'
    })
  }

  const commonTableProps: EModelCommProps<GenTableFieldForDB>['tableProps'] = {
    actions: false,
    showPage: false,
    enableEdit: true,
    autoLoad: false,
    // data: tableFields,
    onShowForm: handleAddTableField,
    tableProps: {
      singleLine: false
    }
  }

  const indexTableProps: EModelCommProps<GenTableFieldForDB>['tableProps'] = {
    ...commonTableProps,
    // data: tableIndexs.value,
    onShowForm: handleAddTableIndex
  }

  const {
    refs: { tableRef: dbTableRef },
    commProps: { tableProps: dbTableProps }
  } = initModel(GenTableFieldForDB, { tableProps: commonTableProps })

  const {
    refs: { tableRef: pageTableRef },
    commProps: { tableProps: pageTableProps }
  } = initModel(GenTableFieldForPage, { tableProps: commonTableProps })

  const {
    refs: { tableRef: ruleTableRef },
    commProps: { tableProps: ruleTableProps }
  } = initModel(GenTableFieldForRule, { tableProps: commonTableProps })

  const {
    refs: { tableRef: fkTableRef },
    commProps: { tableProps: fkTableProps }
  } = initModel(GenTableFieldForFk, { tableProps: commonTableProps })

  const {
    refs: { tableRef: idxTableRef },
    commProps: { tableProps: idxTableProps }
  } = initModel(GenTableIndex, { tableProps: indexTableProps })

  const handleGen = (data) => {
    // genModalRef.value.open(id)
    const { row } = data
    console.log('data ---> ', data)
    mFormRef.value!.open(FormTypeEnum.EDIT, row)
    currTable.value = row
  }

  const rowActions: ButtonActions = [
    'edit',
    {
      action: 'auth',
      html: '代码生成',
      text: true,
      type: 'warning',
      handle: handleGen
    },
    'delete'
  ]
  const genData = ref<IFormData<GenModule>>({})
  const checkedFileTypes = ref<string[]>([
    'entity.vm',
    'mapper.vm',
    'mapperXml.vm',
    'service.vm',
    'serviceImpl.vm',
    'controller.vm',
    'webList.vm',
    'webModel.vm'
  ])
  const currTable = ref<Model>()

  const handleGenModuleTempChange = (value: string) => {
    GenModuleApi.getModule({ code: value }).then((resp) => {
      if (resp.success) {
        // console.log('genData.value ---> ', genData.value)
        // console.log('resp.data ---> ', resp.data)
        const module = resp.data
        const { name } = currTable.value!
        const modelName = camelCase(name?.substring(name?.indexOf('_') + 1))
        const replaceParams = {
          module: modelName
        }
        console.log('replaceParams ---> ', replaceParams)
        Object.keys(module).forEach((key) => {
          module[key] && (genData.value[key] = module[key].replace(/{\s*(.*?)\s*}/g, (_, key) => replaceParams[key]))
        })
        console.log('genData.value ---> ', genData.value)
        genData.value = {
          ...genData.value,
          ...module
        }
        mFormRef.value?.setFormData(genData.value)
      }
    })
  }

  const handleGenSubmit: FormatFormData<GenModule> = async () => {
    console.log('currTable.value ---> ', currTable.value)
    const module = genData.value
    const { name: tableName = '' } = currTable.value!
    const javaFileName = upperFirst(camelCase(tableName))
    const moduleName = camelCase(tableName.substring(tableName.indexOf('_') + 1))
    const getOutFileName = (type: string, pkg: string) => {
      console.log('webFileName --> ', moduleName)
      console.log('javaFileName --> ', javaFileName)
      let fileName = `${module.moduleCode}/${moduleName}/`
      const filePath = pkg.replaceAll('.', '/')
      switch (type) {
        case 'entity':
          fileName += `${filePath}/${javaFileName}.java`
          break
        case 'mapperXml':
          fileName += `${filePath}/${javaFileName}Mapper.xml`
          break
        case 'webList':
          fileName += `web/${filePath}/index.vue`
          break
        case 'webModel':
          fileName += `web/${filePath}/model.ts`
          break
        default:
          fileName += `${filePath}/${javaFileName}${upperFirst(type)}.java`
          break
      }
      return fileName.replaceAll('{module}', moduleName)
    }
    const data: GeneratorData = {
      tableId: currTable.value?.id,
      files: checkedFileTypes.value.map((fName) => {
        const item = fName.replace('.vm', '')
        const outputName = getOutFileName(item, module[item] as string)
        const className = outputName.substring(outputName.lastIndexOf('/') + 1, outputName.lastIndexOf('.'))
        const file: GeneratorFile = {
          type: item,
          pkg: (module.pkg + '.' + module[item]).replaceAll('{module}', moduleName.toLowerCase()),
          path: item,
          outputName,
          className,
          template: `${item}.vm`
        }
        return file
      })
    }
    console.log('module.value ---> ', module)
    const resp = await GeneratorApi.generator(data)
    genPreviewRef.value?.open({
      files: resp.data,
      name: module.name
    })
    return Promise.reject()
  }

  const {
    refs: { formRef: mFormRef },
    commProps: { formProps: mFormProps }
  } = initModel(GenModule)
</script>

<style scoped lang="less">
  :deep(.n-data-table-td--center-align) {
    .n-form-item-blank {
      display: flex;
      justify-content: center;
    }
  }
</style>
