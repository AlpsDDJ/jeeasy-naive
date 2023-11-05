<template>
  <div class="header-row">
    <div class="header-col">
      <n-button text style="font-size: 24px" @click="appStore.toggleCollapsed()">
        <icon :icon-name="appStore.getCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" type="antd"></icon>
      </n-button>
      <n-breadcrumb>
        <n-breadcrumb-item v-for="{ name, meta } in routers" :key="name">
          <icon v-if="meta?.icon" :icon-name="meta?.icon" />
          {{ meta.title }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="header-col">
      <n-switch :value="appStore.darkTheme" @update:value="appStore.toggleTheme">
        <template #icon>
          <icon :icon-name="appStore.darkTheme ? 'Sunny' : 'Moon'" />
        </template>
      </n-switch>
      <n-button quaternary circle @click="toggle">
        <template #icon>
          <icon :icon-name="isFullscreen ? 'Contract' : 'Expand'" />
        </template>
      </n-button>
      <n-avatar size="medium" round @click="logoutHandle">
        <icon icon-name="PersonCircleOutline" />
      </n-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // LayoutHeader
  import { useAppStore } from '@/store/modules/app'
  import { useUserStore } from '@/store/modules/user'

  defineOptions({
    name: 'LayoutHeader'
  })

  const appStore = useAppStore()
  const userStore = useUserStore()

  const { isFullscreen, toggle } = useFullscreen()

  const router = useRouter()
  const routers = computed(() => router.currentRoute.value.matched)

  const logoutHandle = () => {
    userStore.doLogout()
  }
</script>

<style scoped lang="less">
  .header-row {
    display: flex;
    padding: 0 10px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .header-col {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > * {
        margin-left: 8px;
      }
    }
  }
</style>
