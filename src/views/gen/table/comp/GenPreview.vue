<script setup lang="ts">
  import { useDrawer } from '@/hooks/useDrawer'
  import { UseDrawerExpose } from '@/hooks/useDrawer/types'
  import { downloadFile, downloadZip, strToBlob } from '@/utils/download'
  import { GenPreviewProps } from '@/views/gen/table/model'

  defineOptions({
    name: 'GenPreview'
  })
  const { isShow, data, open, close } = useDrawer<GenPreviewProps>()

  const codeType = computed(() => (fileName: string) => {
    const fileExt: string = fileName.split('.')[1]
    switch (fileExt) {
      case 'js':
        return 'javascript'
      case 'ts':
      case 'vue':
        return 'typescript'
      default:
        return fileExt
    }
  })
  const { copy, isSupported } = useClipboard()

  const copyHandler = async (fileContent: string) => {
    if (!isSupported) {
      window.$message.error('您的浏览器不支持Clipboard API')
      return
    }
    await copy(fileContent).catch((e) => {
      window.$message.error('复制失败: ', e)
    })
    window.$message.success('复制成功')
    // try {
    //   await navigator.clipboard.writeText(fileContent)
    // } catch (err: any) {
    //   window.$message.warning(`复制失败：${err?.message || err}`)
    // }
  }

  const downloadHandler = async (fileContent: string, outputName: string) => {
    console.log('downloadHandler --> ', fileContent, outputName)
    const fileName = outputName.substring(outputName.lastIndexOf('/') + 1)
    await downloadFile(strToBlob(fileContent), fileName).catch((error) => {
      window.$message.error(`${fileName} 下载失败: ${error}`)
    })
    window.$message.success(`${fileName} 下载成功`)
  }

  const packageDownload = async () => {
    if (!data.value?.files) return
    await downloadZip(
      data.value.files?.map((item) => ({
        fileName: item.outputName,
        blob: strToBlob(item.content)
      })),
      data.value?.name ?? 'package'
    )
  }

  defineExpose<UseDrawerExpose<GenPreviewProps>>({
    open,
    close
  })
</script>

<template>
  <n-drawer v-model:show="isShow" width="60%" :mask-closable="false">
    <n-drawer-content>
      <template #header> 代码预览 {{ data?.name ? ` - [ ${data?.name} ]` : '' }} </template>
      <n-tabs type="line" animated class="h-full">
        <n-tab-pane v-for="file in data?.files" :key="file.name" :name="file.name" class="h-full">
          <n-card style="height: calc(100% - 15px)" content-style="padding: 8px; height: calc(100% - 25px);">
            <div class="flex justify-end pt-8px">
              <n-space class="pt-8px">
                <n-button text type="tertiary" @click="copyHandler(file.content)">
                  <template #icon>
                    <Icon icon-name="CopyOutline" />
                  </template>
                </n-button>
                <n-button text type="tertiary" @click="downloadHandler(file.content, file.outputName)">
                  <template #icon>
                    <Icon icon-name="DownloadOutline" />
                  </template>
                </n-button>
              </n-space>
            </div>
            <n-scrollbar style="height: calc(100% - 25px)">
              <div class="pb-30px">
                <n-code :code="file.content" :language="codeType(file.outputName)" show-line-numbers class="" />
              </div>
            </n-scrollbar>
          </n-card>
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-space>
          <n-button type="primary" secondary @click="packageDownload">
            <template #icon>
              <Icon icon-name="DownloadOutline" />
            </template>
            打包下载
          </n-button>
          <n-button type="default" secondary @click="() => close()">关闭</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
