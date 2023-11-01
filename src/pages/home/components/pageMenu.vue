<template>
	<div class="position-fixed left-0">
		<div
			key="logo"
			class="h-50px flex flex-items-center flex-justify-center bg-#001529 logo"
		>
			<img src="/src/assets/img/logo.png" alt="" width="32" height="32" />
			<span v-if="!collapsed" class="color-white">若依管理系统</span>
		</div>
		<a-menu
			id="dddddd"
			class="page-menu"
			mode="inline"
			:inline-collapsed="collapsed"
			:theme="menuTheme"
		>
			<menuItem v-for="m of menu" :key="m.path" :menu="m" />
		</a-menu>
	</div>
</template>
<script setup lang="ts">
import menuItem from './menuItem.vue'
import { useSystemStore } from '@/store/system/index'
import { useMenuStore } from '@/store/menu'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const { collapsed, menuTheme } = storeToRefs(useSystemStore())
const { menu } = storeToRefs(useMenuStore())

const leftWidth = computed(() => {
	return collapsed.value ? '50px' : '220px'
})
</script>
<style lang="less" scoped>
.page-menu {
	width: v-bind(leftWidth);
	height: calc(100vh - 50px);
	overflow-y: auto;
	transition: all 0.5s;
}
.logo {
	width: v-bind(leftWidth);
	transition: all 0.5s;
}
</style>
