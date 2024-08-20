import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { Route } from '@/pages/login/types'
import { isUrl } from '@/utils/isUrl'

declare type Recordable<T = any> = Record<string, T>
function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('/src/pages', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  else if (matchKeys?.length > 1) {
    console.error('重复组件')
  }
  else {
    console.error('找不到组件')
  }
}

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<Route[]>([])

  const menuMap = reactive<Record<string, Route>>({})

  const router = useRouter()

  function generateRoute(routes: Route[]) {
    formatRoutes(routes)
    menu.value = routes
  }

  function formatRoutes(r: Route[], parentRoute?: Route) {
    const dynamicViewsModules: Record<string, () => Promise<Recordable>>
      = import.meta.glob('/src/pages/**/*.{vue,tsx}')
    r.forEach((route) => {
      const path = route.path
      route.path
      = path.charAt(0) === '/' || isUrl(path) ? route.path : `/${route.path}`
      if (parentRoute) {
        route.path = `${parentRoute.path}${route.path}`
      }
      if (route.children && route.children.length > 0) {
        formatRoutes(route.children, route)
      }
      menuMap[route.path] = route
      if (!route.alwaysShow) {
        const r = {
          path: route.path,
          name: route.name,
          component: dynamicImport(dynamicViewsModules, route.component),
          meta: route.meta,
        }
        router.addRoute('layout', r as unknown as RouteRecordRaw)
      }
    })
  }

  return {
    menu,
    formatRoutes,
    generateRoute,
    menuMap,
  }
})
