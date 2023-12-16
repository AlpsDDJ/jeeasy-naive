<template>
  <div>
    <e-model>
      <template #top>
        <e-search ref="queryRef" v-model:model-value="queryData" :instance="Model" :load-data="loadData" />
      </template>
      <e-table ref="tableRef" :instance="Model" :query-data="queryData" :actions="rowActions" @show-form="showFormModal">
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
          :format-form-data="async (_formData) => ({ ..._formData, tableFields, tableIndexs })"
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
    <!--<gen-modal ref="genModalRef" />-->
    <e-form ref="genModalRef" v-model:model-value="genData" :instance="GenModule" :format-form-data="handleGenSubmit">
      <n-form-item label="生成文件">
        <n-checkbox-group v-model:value="checkedFileTypes">
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
        </n-checkbox-group>
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
    <!--<e-form ref="genModalRef" :instance="GenModule" />-->
  </div>
</template>

<script lang="ts" setup>
  import Model, {
    GenTableField,
    GenTableFieldForDB,
    GenTableFieldForPage,
    GenTableFieldForRule,
    GenTableFieldForFk,
    GenTableIndex,
    GeneratorApi
  } from './model'
  import { initModel } from '@/components/ext'
  import { EFormProps, ETableProps, IFormData, ShowForm } from '@/components/ext/types'
  import { camelCase, cloneDeep, upperFirst } from 'lodash-es'
  import { ButtonActions } from '@/components/ActionButton/commonActions'
  import GenModule, { GeneratorData, GeneratorFile, GenModuleApi } from '@/views/gen/module/model'

  defineOptions({
    name: 'GenTableList'
  })

  const { tableRef, formRef, queryRef, formData, queryData, loadData, showForm } = initModel()
  const activeTab = ref<string>('db')

  const tableFields = ref<GenTableFieldForDB[]>([])
  const tableIndexs = ref<GenTableIndex[]>([])
  const showFormModal: ShowForm = (type, formData) => {
    showForm(type, formData)
    activeTab.value = 'db'
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

  const genModalRef = ref()

  const handleGen = ({ row }) => {
    // genModalRef.value.open(id)
    genModalRef.value!.open('edit', {})
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
  const checkedFileTypes = ref<string[]>(['entity', 'mapper', 'mapperXml', 'service', 'serviceImpl', 'controller', 'webList', 'webModel'])
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
        // genData.value = {
        //   ...genData.value,
        //   ...module
        // }
      }
    })
  }

  const handleGenSubmit: EFormProps<GenModule>['formatFormData'] = async () => {
    console.log('genData.value ---> ', genData.value)
    const module = genData.value
    const { name: tableName = '' } = currTable.value!
    const getOutFileName = (type: string, pkg: string) => {
      const javaFileName = upperFirst(camelCase(tableName))
      const webFileName = camelCase(tableName.substring(tableName.indexOf('_') + 1))
      let fileName = `${module.moduleCode}/${webFileName}/`
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
      return fileName
    }
    const data: GeneratorData = {
      tableId: currTable.value?.id,
      files: checkedFileTypes.value.map((item) => {
        const outputName = getOutFileName(item, module[item] as string)
        const className = outputName.substring(outputName.lastIndexOf('/') + 1, outputName.lastIndexOf('.'))
        const file: GeneratorFile = {
          type: item,
          pkg: module.pkg + '.' + module[item],
          path: item,
          outputName,
          className,
          template: `${item}.vm`
        }
        return file
      })
    }
    console.log('GeneratorData ----> ', data)
    await GeneratorApi.generator(data)
    return Promise.reject()
  }
</script>

<style scoped></style>
