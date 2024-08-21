<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Route } from '@/pages/login/types'
import { useThemeToken } from '@/hooks/useToken'
import { useSystemStore } from '@/store/system'
import { useTagStore } from '@/store/tag'

interface Props {
  tag: Route
}

const props = withDefaults(defineProps<Props>(), {
  tag: () => ({}) as Route,
})

const router = useRouter()

const route = useRoute()
const isActive = computed(() => route.path === props.tag.path)

function go(route: Route) {
  if (!route.path)
    return
  router.push({ path: route.path })
}

const token = useThemeToken()

const tagBorder = computed(() => {
  return `${token.value.borderRadius}px`
})

const systemStore = storeToRefs(useSystemStore())

const { delTag } = useTagStore()

const isDark = computed(() => {
  return systemStore.dark.value
})

const activeTagBg = computed(() => {
  if (isDark.value) {
    return '#2E3033'
  }
  return token.value.colorPrimaryBgHover
})
</script>

<template>
  <span
    class="
      bg-white
      flex
      items-center
      font-size-12px
      p-4px
      ml-8px
      relative
      tab-list
      dark:bg-#1C1E22
      cursor-pointer
      color-base
      base-border-color
      border
      border-solid
      tag
      font-size-14px
      pl-8px
      pr-28px
      transition-all
      duration-100
    "
    :class="{ 'tab-list-active': isActive }"
    @click="go(tag)"
  >
    <svgIcon class="mr-8px" width="12px" height="12px" :name="tag.meta.icon || 'form'" :color="isDark ? 'white' : isActive ? token.colorPrimaryActive : 'black'" />
    <span>{{ tag.meta.title }}</span>
    <span v-if="tag.path === '/home'" class="i-bi:pin absolute right-8px w-12px h-12px" />
    <span v-else class="i-ic:round-close absolute right-8px w-12px h-12px hover:scale-150 transition-transform duration-300" @click.stop="delTag(tag.path)" />
  </span>
</template>

<style scoped>
.tag {
  border-radius: v-bind(tagBorder);
}
.tab-list-active {
  background-color: v-bind('activeTagBg') !important;
  color: v-bind('token.colorPrimaryActive')
}
</style>
