<template>
	<span
		class="color-white font-size-12px p-4px ml-10px tab-list tab-list-active dark:bg-#262626 cursor-pointer"
		@click="go(tag)"
		>{{ tag }}</span
	>
</template>
<script setup lang="ts">
import { useThemeToken } from '@/hooks/useToken'
import { useRouter } from 'vue-router'

defineProps({
	tag: {
		type: String
	}
})

const router = useRouter()
const go = (name: string | undefined) => {
	if (!name) return
	router.push({ name })
}

const token = useThemeToken()
</script>
<style scoped>
.tab-list-active {
	background: v-bind('token.colorPrimary');
}

.tab-list-active::before {
	content: '';
	background: #fff;
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: relative;
	margin-right: 2px;
}
</style>
