import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { Route } from '@/pages/login/types'
import { isURL } from '@/utils/base'

export interface SearchResult {
  title: string
  path: string
  icon?: string
}

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

const relationCache: Record<string, string[]> = {}
const searchCache: Record<string, SearchResult[]> = {}

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<Route[]>([])

  const menuMap = reactive<Record<string, Route>>({})

  const relationMap = reactive<Record<string, string>>({})

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
      = path.charAt(0) === '/' || isURL(path) ? route.path : `/${route.path}`
      if (parentRoute) {
        route.path = `${parentRoute.path}${route.path}`
        relationMap[route.path] = parentRoute.path
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

  function getMenuByPath(path: string) {
    return menuMap[path] || undefined
  }

  function getBreadcrumb(p: string) {
    let result = relationCache[p]
    if (result) {
      return result
    }
    result = []
    let path = p
    while (path) {
      result.unshift(menuMap[path]?.meta?.title)
      path = relationMap[path]
    }
    if (!relationCache[p]) {
      relationCache[p] = result
    }
    return result
  }

  function getMenuByKeyword(keyword: string) {
    const result = Object.keys(menuMap).filter((path) => {
      const menu = menuMap[path]
      const { title } = menu?.meta || {}
      if (!title) {
        return false
      }
      return !!title.includes(keyword)
    })
    return result
  }

  function getFullTitleByPath(path: string) {
    let title = getMenuByPath(path).meta.title
    let parentPath = relationMap[path]
    while (parentPath) {
      const parentTitle = getMenuByPath(parentPath).meta.title
      title = `${parentTitle} / ${title}`
      parentPath = relationMap[parentPath]
    }
    return title
  }

  function searchMenu(keyword: string) {
    if (keyword === '') {
      return []
    }
    if (searchCache[keyword]) {
      return searchCache[keyword]
    }
    const menuList = getMenuByKeyword(keyword)
    if (!menuList.length) {
      return []
    }
    const result = menuList.map((path) => {
      const title = getFullTitleByPath(path)
      const icon = getMenuByPath(path).meta.icon
      return {
        path,
        title,
        icon,
      }
    })

    searchCache[keyword] = result
    return result
  }

  return {
    menu,
    formatRoutes,
    generateRoute,
    menuMap,
    getMenuByPath,
    getBreadcrumb,
    relationCache,
    relationMap,
    searchMenu,
  }
})
