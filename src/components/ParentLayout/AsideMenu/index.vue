<template>
  <n-layout-sider>
    <n-menu :value="route.name || ''" :accordion="appStore.getAccordion" :options="menus" />
  </n-layout-sider>
</template>

<script lang="tsx" setup name="AsideMenu">
  import { useAppStore } from '@/store/modules/app'
  import { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
  import { renderIcon } from '@/utils/iconUtil'
  import { RouteRecord } from 'vue-router'
  // import { renderIcon } from '@/utils/iconUtil'
  const appStore = useAppStore()
  const reouter = useRouter()
  const route = reouter.currentRoute
  // const currentMenu = ref<string>(route.value.name as string)

  const routes: RouteRecord[] = reouter.getRoutes()
  const menus = ref<MenuMixedOption[]>([])

  const getOption = async (menu) => {
    return {
      key: menu.name,
      label: () => <router-link to={menu.path}>{menu.meta.title}</router-link>,
      icon: await renderIcon(menu.icon),
      children: null
    }
  }

  onMounted(async () => {
    // menus.value = routes
    //   .filter(({ meta }) => !meta.hideMenu)
    //   .map(
    //     (item) =>
    //       ({
    //         key: item.name,
    //         label: () => <router-link to={item.path}>{item.meta.title}</router-link>,
    //         icon: async () => item.meta.icon && (await renderIcon(item.meta.icon as string))
    //       } as unknown as MenuMixedOption)
    //   )

    // @ts-ignore
    menus.value = await Promise.all(
      routes.map(async (m) => {
        if (m.children && m.children.length > 0) {
          const children = await Promise.all(m.children.map(async (child) => await getOption(child)))

          const menu = await getOption(m)
          // @ts-ignore
          menu.children = children
          return menu
        } else {
          return await getOption(m)
        }
      })
    )
  })
</script>

<style scoped></style>
