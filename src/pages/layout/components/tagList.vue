<script setup lang="ts">
import tag from './Tag.vue'
import tagMenu from './TagMenu'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { Route } from '@/pages/login/types'
import { useTagStore } from '@/store/tag'

const { cacheTags } = storeToRefs(useTagStore())

const allTags = computed(() => {
  return [{ path: '/home', meta: { title: '首页' } }, ...cacheTags.value] as Route[]
})

const tagMenuRef = ref()

function handleClick(evt: MouseEvent, tag: Route) {
  evt.preventDefault()
  const { clientX, clientY } = evt
  tagMenuRef.value.showRightMenu({
    x: clientX,
    y: clientY,
    route: tag,
  })
}
</script>

<template>
  <div class="h-36px border-t-1px border-b-1px border-l-0 border-r-0 base-border-color border-solid flex items-center">
    <tag v-for="t of allTags" :key="t.name" :tag="t" @click.right="handleClick($event, t)" />
    <tagMenu ref="tagMenuRef" />
  </div>
</template>
