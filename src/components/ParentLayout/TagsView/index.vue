<template>
  <div class="tags-view">
    <n-scrollbar ref="scrollRef" x-scrollable @wheel="scrollHandle($event)">
      <n-space :wrap="false" inline>
        <n-tag
          v-for="tag in showTags"
          :key="tag.key"
          :closable="tagClosable"
          :bordered="true"
          :type="activeTagKey(tag.key) ? 'success' : 'default'"
          class="tag no-select"
          :theme-overrides="{ color: themeVars.bodyColor }"
          @click="tagClickHandle(tag.key)"
          @close="tagCloseHandle(tag.key)"
          @mousedown="({ button: type }) => mousedownHandle(type, tag.key)"
        >
          <template v-if="tag.icon" #icon>
            <icon :icon-name="tag.icon" />
          </template>
          <span>{{ tag.title }}</span>
        </n-tag>
      </n-space>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import type { ScrollbarInst } from 'naive-ui'
  import { useThemeVars } from 'naive-ui'
  import { remove, sortBy } from 'lodash-es'

  defineOptions({
    name: 'TagsView'
  })

  const router = useRouter()

  import { useAppStore } from '@/store/modules/app'
  const appStore = useAppStore()
  const themeVars = useThemeVars()

  type Tag = {
    key: string
    title: string
    index: number
    icon?: string | undefined
    // closable?: boolean
  }

  const tags = ref<Tag[]>([])
  const tagIndex = ref<number>(0)
  const currTagKey = ref<string>('')

  // 展示标签 (排序后)
  const showTags = computed(() => sortBy(tags.value, 'index'))
  console.debug('showTags --> ', showTags)
  // 是否为当前标签
  const activeTagKey = computed(() => (key) => currTagKey.value === key)
  // 标签是否可关闭
  const tagClosable = computed(() => tags.value && tags.value.length > 1)

  watchEffect(() => {
    const { fullPath, meta } = router.currentRoute.value
    currTagKey.value = fullPath
    const tag = tags.value.find(({ key }) => key === fullPath)

    if (!tag) {
      const { title = '', icon = '' } = meta
      tags.value.push({
        key: fullPath,
        title: title as string,
        index: tagIndex.value++,
        icon: icon as string
      })
    } else {
      removeTag(fullPath)
      tags.value.push(tag)
    }
  })

  /**
   * 移除标签
   * @param removkKey
   * @param _route
   */
  async function removeTag(removkKey: string, _route = false) {
    if (removkKey === currTagKey.value) {
      if (_route) {
        await router.push(tags.value[tags.value.length - 2].key)
      }
      remove(tags.value, ({ key }) => key === removkKey)
    } else {
      remove(tags.value, ({ key }) => key === removkKey)
    }
  }

  function tagClickHandle(key: string) {
    router.push(key)
  }

  function tagCloseHandle(key) {
    removeTag(key, true)
  }

  function mousedownHandle(type, key) {
    if (tagClosable.value && type === 1) {
      removeTag(key, true)
    }
  }

  const scrollRef = ref<ScrollbarInst>()
  const scrollHandle = (e) => {
    scrollRef.value!.scrollBy(e.deltaY, 0)
  }

  const layoutBackgroundColor = computed(() => {
    return appStore.darkTheme ? 'auto' : '#F5F7F9'
  })
</script>

<style lang="less" scoped>
  .tags-view {
    background-color: v-bind(layoutBackgroundColor);
    padding: @spacing-y @spacing-x;
    .tag {
      height: @router-tag-height;
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
        cursor: pointer;
        .n-base-close {
          display: block;
        }
      }
    }
  }
</style>
