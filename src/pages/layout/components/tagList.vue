<template>
	<div class="h-30px mt-4px mb-4px">
		<tag v-for="tag of allTags" :key="tag" :tag="tag" />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import tag from './tag.vue'
import { useTagStore } from '@/store/tag'
import { computed } from 'vue'

const { cacheTags } = storeToRefs(useTagStore())

const allTags = computed(() => {
	return ['Home', ...cacheTags.value]
})
</script>
