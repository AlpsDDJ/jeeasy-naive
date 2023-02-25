<template>
  <n-menu
    :collapsed="appStore.getCollapsed"
    :value="route.name || ''"
    :accordion="appStore.getAccordion"
    :options="menuState.menus"
    :collapsed-width="appStore.layout.menuMinWidth"
    :default-expanded-keys="route.matched.map(({ name }) => name)"
  />
</template>

<script lang="tsx" setup name="AsideMenu">
  import { useAppStore } from '@/store/modules/app'
  import { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
  import { RouteRecordRaw } from 'vue-router'
  import { isNotNull } from '@/utils/tools'
  const appStore = useAppStore()
  const router = useRouter()
  const route = useRoute()

  const menuState = reactive<{ menus: any[] }>({ menus: [] })

  const getOption = (route: RouteRecordRaw): MenuMixedOption => {
    const menu = {
      key: route.name,
      label: () =>
        isNotNull(route.children) ? (
          <span class="no-select">{route.meta?.title}</span>
        ) : (
          <router-link to={route.path}>
            <span class="no-select">{route.meta?.title}</span>
          </router-link>
        ),
      icon: () => route.meta?.icon && <icon iconName={route.meta.icon} />
    } as MenuMixedOption
    if (isNotNull(route.children)) {
      menu.children = createMenus(route.children || [])
    }
    return menu
  }

  const createMenus = (routes: RouteRecordRaw[]): MenuMixedOption[] => {
    return routes.filter((route) => !route.meta?.hideMenu).map((item) => getOption(item))
  }

  const { width } = useWindowSize()
  appStore.toggleCollapsed(width.value < 720)

  const toggleCollapsedTimer = ref()

  watchEffect(() => {
    if (width.value < 720) {
      clearTimeout(toggleCollapsedTimer.value)
      toggleCollapsedTimer.value = setTimeout(() => {
        appStore.toggleCollapsed(true)
      }, 100)
    } else {
      clearTimeout(toggleCollapsedTimer.value)
      toggleCollapsedTimer.value = setTimeout(() => {
        appStore.toggleCollapsed(false)
      }, 100)
    }
  })

  onMounted(() => {
    const routes = router.options.routes.map((item) => item)
    menuState.menus = createMenus(routes)
  })
</script>

<style scoped lang="less"></style>
