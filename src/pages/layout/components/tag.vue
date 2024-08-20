<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useThemeToken } from '@/hooks/useToken'
import { useSystemStore } from '@/store/system'

defineProps({
  tag: {
    type: String,
  },
})

const router = useRouter()

function go(name: string | undefined) {
  if (!name)
    return
  router.push({ name })
}

const token = useThemeToken()

const tagBorder = computed(() => {
  return `${token.value.borderRadius}px`
})

const systemStore = useSystemStore()

const isDark = computed(() => {
  return systemStore.dark
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
    @click="go(tag)"
  >
    <svgIcon class="mr-8px" width="12px" height="12px" name="guide" :color="isDark ? 'white' : 'black'" />
    <span>{{ tag }}</span>
    <span v-if="tag === 'Home'" class="i-bi:pin absolute right-8px w-12px h-12px" />
    <span v-else class="i-ic:round-close absolute right-8px w-12px h-12px hover:scale-150 transition-transform duration-300" />
  </span>
</template>

<style scoped>
.tag {
  border-radius: v-bind(tagBorder);
}
.tab-list-active {
  background: v-bind('token.colorPrimary');
}
</style>
