<script setup lang="ts">
import { computed, nextTick, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import type { SearchResult } from '@/store/menu/index'
import { useAddEvent } from '@/hooks/useAddEvent'
import { useThemeRadius, useThemeToken } from '@/hooks/useToken'
import { useMenuStore } from '@/store/menu/index'
import { isUrl } from '@/utils/base'
import { useSystemStore } from '@/store/system'

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const searchInputRef = ref<HTMLInputElement | null>(null)
const show = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val)
  },
})

watch(show, (val) => {
  if (val) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
})

useAddEvent<'keydown'>(document, 'keydown', (e) => {
  const { key } = e
  if (key === 'Escape') {
    show.value = false
  }
})

const borderRadius = useThemeRadius()
const token = useThemeToken()
const { state } = toRefs(useSystemStore())
const searchValue = ref('')
const searchResult = ref<SearchResult[]>([])
const { searchMenu } = useMenuStore()

watch(searchValue, (val) => {
  searchResult.value = searchMenu(val)
})

const router = useRouter()
function go(path: string) {
  show.value = false
  searchValue.value = ''
  if (isUrl(path)) {
    window.open(path)
  }
  else {
    router.push(path)
  }
}

const searchContainerRef = ref(null)
onClickOutside(searchContainerRef, () => {
  show.value = false
})
</script>

<template>
  <div v-if="show" class="search-mask h-100vh w-100vw fixed left-0 top-0 z-100 flex items-center justify-center">
    <div ref="searchContainerRef" class="h-60vh w-640px bg-#F6F7F7 dark:bg-#1C1E22 search-border flex flex-col z-2000">
      <div class="w-full h-50px base-border-color border-0 border-b border-solid">
        <a-input ref="searchInputRef" v-model:value="searchValue" class="wh-full" :bordered="false" placeholder="搜索导航菜单">
          <template #prefix>
            <span class="i-ic:round-search cursor-pointer color-base" />
          </template>
        </a-input>
      </div>
      <div class="flex-1 p-4 overflow-y-auto">
        <div v-for="item of searchResult" :key="item.path" class="search-item search-border p-4 bg-base cursor-pointer" @click="go(item.path)">
          <svgIcon class="mr-8px" width="15px" height="15px" :name="item.icon || 'form'" :color="state.dark ? '#fff' : '#000'" />
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.search-mask {
  backdrop-filter: blur(3px);
}

.search-border {
  border-radius: v-bind('borderRadius');
}

.search-item:hover {
  background-color: v-bind('token.colorPrimaryBgHover') !important;
}

.search-item + .search-item {
  margin-top: 16px;
}
</style>
