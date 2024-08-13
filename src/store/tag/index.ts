import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useTagStore = defineStore('tag', () => {
  const currentRouteTitle = ref('首页')
  const defaultTitle = 'ruoyi-antd'
  const cacheTags = ref<string[]>([])
  const router = useRouter()
  const route = useRoute()

  const addTag = (componentName: string) => {
    if (componentName === 'Home' || cacheTags.value.includes(componentName)) {
      return
    }
    cacheTags.value.push(componentName)
  }

  const delTag = (componentName: string) => {
    const index = cacheTags.value.findIndex(it => it === componentName)
    if (index !== -1) {
      cacheTags.value.splice(index, 1)
    }
    if (route.name === componentName) {
      router.replace({ name: cacheTags.value[cacheTags.value.length - 1] })
    }
  }

  return {
    currentRouteTitle,
    defaultTitle,
    cacheTags,
    addTag,
    delTag,
  }
})
