<template>
  <n-menu
    :collapsed="appStore.getCollapsed"
    :value="route.name || ''"
    :accordion="appStore.getAccordion"
    inverted
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
  import { useUserStore } from '@/store/modules/user'
  import { menuToRouter } from '@/router'
  const appStore = useAppStore()
  const userStore = useUserStore()
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
          <router-link to={{ name: route.name }}>
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
  watchEffect(async () => {
    const dynamicRouter = (await menuToRouter(userStore.menus)) || []
    const routes = [...router.options.routes, ...dynamicRouter]
    menuState.menus = createMenus(routes)
  })

  onMounted(async () => {})
</script>

<style scoped lang="less"></style>
