<template>
	<a-sub-menu v-if="menu.alwaysShow" :key="menu.path">
		<template #icon>
			<svgIcon :name="menu.meta.icon" />
		</template>
		<template #title>
			<span :title="menu.meta.title">{{ menu.meta.title }}</span>
		</template>
		<menuItem v-for="m of menu.children" :key="m.path" :menu="m" />
	</a-sub-menu>
	<a-menu-item :key="menu.path + ''" v-else>
		<template #icon>
			<svgIcon :name="menu.meta.icon" />
		</template>
		<span :title="menu.meta.title">{{ menu.meta.title }}</span>
	</a-menu-item>
</template>

<script setup lang="ts" name="menuItem">
import { defineProps } from 'vue'

defineProps({
	menu: {
		type: Object,
		default: () => {}
	}
})
</script>
