<script setup lang="ts">
import tag from './tag.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTagStore } from '@/store/tag'

const { cacheTags } = storeToRefs(useTagStore())

const allTags = computed(() => {
  return [{ path: '/home', meta: { title: '首页' } }, ...cacheTags.value]
})
</script>

<template>
  <div class="h-36px border-t-1px border-b-1px border-l-0 border-r-0 base-border-color border-solid flex items-center">
    <tag v-for="tag of allTags" :key="tag" :tag="tag" />
  </div>
</template>
