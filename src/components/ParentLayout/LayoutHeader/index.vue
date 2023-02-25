<template>
  <n-grid class="header-row">
    <n-gi class="header-col" item-responsive>
      <n-button
        text
        style="font-size: 24px"
        @click="
          () => {
            appStore.toggleCollapsed()
          }
        "
      >
        <icon :icon-name="appStore.getCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" type="antd"></icon>
      </n-button>
    </n-gi>
    <n-gi>
      <n-breadcrumb>
        <n-breadcrumb-item v-for="{ name, meta } in routers" :key="name">
          <icon v-if="meta?.icon" :icon-name="meta?.icon" />
          {{ meta.title }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </n-gi>
    <n-gi suffix class="header-col suffix-col">
      <icon icon-name="PersonCircleOutline" :size="28" />
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup name="LayoutHeader">
  // LayoutHeader
  import { useAppStore } from '@/store/modules/app'
  const appStore = useAppStore()

  const router = useRouter()
  const routers = computed(() => router.currentRoute.value.matched)
</script>

<style scoped lang="less">
  .header-row {
    padding: 0 10px;
    .header-col {
      display: flex;
      align-items: center;
    }
    .suffix-col {
      display: flex;
      justify-content: right;
    }
  }
</style>
