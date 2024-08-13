<script setup lang="ts">
import tag from './tag.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTagStore } from '@/store/tag'

const { cacheTags } = storeToRefs(useTagStore())

const allTags = computed(() => {
  return ['Home', ...cacheTags.value]
})
</script>

<template>
  <div class="h-30px mt-4px mb-4px">
    <tag v-for="tag of allTags" :key="tag" :tag="tag" />
  </div>
</template>
