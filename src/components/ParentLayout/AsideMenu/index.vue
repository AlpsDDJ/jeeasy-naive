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
          <span>{route.meta?.title}</span>
        ) : (
          <router-link to={route.path}>{route.meta?.title}</router-link>
        ),
      icon: () => route.meta?.icon && <icon iconName={route.meta.icon} />
    } as MenuMixedOption
    if (isNotNull(route.children)) {
      menu.children = createMenus(route.children || [])
    }
    return menu
  }

  const createMenus = (routes: RouteRecordRaw[]): MenuMixedOption[] => {
    return routes.filter(({ meta }) => !meta?.hideMenu).map((item) => getOption(item))
  }

  onMounted(() => {
    const routes = router.options.routes.map((item) => item)
    menuState.menus = createMenus(routes)
    // const menus1 = createMenus(routes)
    // menus.value = menus1
    // menus.value = createMenus(routes)
    // @ts-ignore
    // menus.value = await Promise.all(
    //   // generateMenus(routes)
    //   routes
    //     .filter(({ meta }) => !meta?.hideMenu)
    //     .map(async (m) => {
    //       if (m.children && m.children.length > 0) {
    //         const children = await Promise.all(
    //           m.children.filter(({ meta }) => !meta?.hideMenu).map(async (child) => await getOption(child))
    //         )
    //         const menu = await getOption(m)
    //         // @ts-ignore
    //         menu.children = children
    //         return menu
    //       } else {
    //         return await getOption(m)
    //       }
    //     })
    // )
  })
</script>

<style scoped lang="less"></style>
