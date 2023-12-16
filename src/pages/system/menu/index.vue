<template>
	<div class="excludeHeight p-10px">
		<a-card class="h-100%">
			<a-space>
				<a-button @click="count++">
					{{ count }}
				</a-button>

				<a-button v-if="cacheTags.includes('Menu')" @click="del"
					>删除当前页面keep-alive</a-button
				>
				<span v-else>已删除!</span>
			</a-space>
		</a-card>
    <micro-app name='menu-app' url='http://localhost:5173' iframe :keep-alive="cacheTags.includes('Menu')"></micro-app>
	</div>
</template>

<script lang="ts" setup name="Menu">
import { ref } from 'vue'
// @ts-ignore
import { useTagStore } from '@/store/tag'

const count = ref(0)

const { delTag, cacheTags } = useTagStore()

const del = () => {
	delTag('Menu')
}
</script>
<style scoped>
.excludeHeight {
	height: calc(100% - 20px);
}
</style>
