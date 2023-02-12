<template>
  <n-layout-sider>
    <n-menu :value="route.name || ''" :accordion="appStore.getAccordion" :options="menus" />
  </n-layout-sider>
</template>

<script lang="tsx" setup name="AsideMenu">
  import { useAppStore } from '@/store/modules/app'
  import { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
  import { RouteRecord } from 'vue-router'
  const appStore = useAppStore()
  const reouter = useRouter()
  const route = reouter.currentRoute

  const routes: RouteRecord[] = reouter.getRoutes()
  const menus = ref<MenuMixedOption[]>([])

  const getOption = async (menu) => {
    const iconName = 'AccessibilityOutline'
    return {
      key: menu.name,
      label: () => <router-link to={menu.path}>{menu.meta.title}</router-link>,
      icon: () => <icon iconName={iconName} />,
      children: null
    }
  }

  onMounted(async () => {
    // @ts-ignore
    menus.value = await Promise.all(
      routes
        .filter(({ meta }) => !meta.hideMenu)
        .map(async (m) => {
          if (m.children && m.children.length > 0) {
            const children = await Promise.all(
              m.children.filter(({ meta }) => !meta?.hideMenu).map(async (child) => await getOption(child))
            )
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
