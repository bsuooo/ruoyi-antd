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
    if (['/home', '/login'].includes(path)) {
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

  return {
    cacheTags,
    addTag,
    delTag,
  }
})
