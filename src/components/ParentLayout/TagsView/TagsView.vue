<template>
  <div class="tags-view">
    <n-scrollbar ref="scrollRef" x-scrollable @wheel="scrollHandle($event)">
      <n-space :wrap="false" inline>
        <n-tag v-for="tag in tags" :key="tag.key" :checked="tag.closable" closable :bordered="false" class="tag">
          <span>{{ tag.title }}</span>
        </n-tag>
      </n-space>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup name="TagsView">
  // import { useAppStore } from '@/store/modules/app'

  import type { ScrollbarInst } from 'naive-ui'

  type Tag = {
    key: string | number
    title: string
    closable?: boolean
  }

  const tags = ref<Tag[]>([])

  for (let i = 0; i < 35; i++) {
    tags.value.push({
      key: i,
      title: `菜单 ${i}`
    })
  }

  const scrollRef = ref<ScrollbarInst>()

  const scrollHandle = (e) => {
    scrollRef.value!.scrollBy(e.deltaY, 0)
  }

  // const appStore = useAppStore()
  // const headerHeight = ref<string>(`${appStore.layout.headerHeight / 2}px`)
</script>

<style lang="less" scoped>
  .tags-view {
    padding: 6px 10px;
    .tag {
      display: inline-flex;
      border-radius: 4px;
      align-items: center;
      justify-content: center;
      min-width: 50px;
      cursor: default;
      padding: 0 10px;
    }
  }
</style>
<style lang="less">
  .tags-view {
    .n-scrollbar-rail__scrollbar {
      display: none;
    }
    .tag {
      padding: 0 10px 0 12px;
      .n-base-close {
        display: none;
      }
      &:hover {
        .n-base-close {
          display: block;
        }
      }
    }
  }
</style>
