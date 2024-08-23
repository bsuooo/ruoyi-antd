import { useMenuStore } from '../menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Route } from '@/pages/login/types'

export const useTagStore = defineStore('tag', () => {
  const cacheTags = ref<Route[]>([])
  const router = useRouter()
  const route = useRoute()
  const { getMenuByPath } = useMenuStore()

  const addTag = (path: string) => {
    if (['/home', '/login', '/redirect'].includes(path)) {
      return
    }
    const menuIndex = cacheTags.value.findIndex(it => it.path === path)

    if (menuIndex !== -1) {
      return
    }
    const menu = getMenuByPath(path)

    cacheTags.value.push(menu)
  }

  const delTag = (path: string) => {
    const index = cacheTags.value.findIndex(it => it.path === path)
    if (index !== -1) {
      cacheTags.value.splice(index, 1)
      if (route.path === path) {
        // 如果删除的是当前路由，则跳转到上一个路由
        setTimeout(() => {
          router.replace({ path: cacheTags.value[cacheTags.value.length - 1]?.path || '/home' })
        }, 0)
      }
    }
  }

  function afterClose(path: string) {
    if (route.path !== path && !['/home', '/login', ...cacheTags.value.map(it => it.path)].includes(route.path)) {
      router.replace({ path })
    }
  }

  const refreshTag = (cb?: () => void) => {
    router.replace({ path: '/redirect', query: { path: route.fullPath } })
    if (cb) {
      cb()
    }
  }

  const delCurrentTag = (path?: string, cb?: () => void) => {
    if (path) {
      delTag(path)
    }
    if (cb) {
      cb()
    }
  }

  const delAllTag = (cb?: () => void) => {
    cacheTags.value = []
    router.replace({ path: '/home' })
    if (cb) {
      cb()
    }
  }

  const delOtherTag = (path?: string, cb?: () => void) => {
    if (path) {
      cacheTags.value = cacheTags.value.filter(it => it.path === path)
      afterClose(path)
    }
    if (cb) {
      cb()
    }
  }

  const delLeftTag = (path?: string, cb?: () => void) => {
    if (path) {
      const index = cacheTags.value.findIndex(it => it.path === path)
      cacheTags.value = cacheTags.value.slice(index)
      afterClose(path)
    }
    if (cb) {
      cb()
    }
  }

  const delRightTag = (path?: string, cb?: () => void) => {
    if (path) {
      const index = cacheTags.value.findIndex(it => it.path === path)
      cacheTags.value = cacheTags.value.slice(0, index + 1)
      afterClose(path)
    }
    if (cb) {
      cb()
    }
  }

  return {
    cacheTags,
    addTag,
    delTag,
    refreshTag,
    delCurrentTag,
    delAllTag,
    delOtherTag,
    delLeftTag,
    delRightTag,
  }
})
