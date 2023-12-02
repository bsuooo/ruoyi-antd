<template>
	<span
		class="color-white font-size-12px p-4px ml-10px tab-list tab-list-active dark:bg-#262626"
		>首页</span
	>
</template>
<script setup lang="ts">
import { useThemeToken } from '@/hooks/useToken'

const token = useThemeToken()

</script>
<style scoped>
/* todo: less 使用v-bind 报错 */
.tab-list-active {
  background: v-bind(token.colorPrimary);
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
