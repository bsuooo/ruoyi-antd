<template>
	<a-config-provider
		:theme="{
			token: { colorPrimary: primaryColor },
			algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
		}"
	>
		<router-view />
	</a-config-provider>
</template>

<script setup lang="ts">
import { useTagStore } from '@/store/tag/index'
import { useSystemStore } from '@/store/system/index'
import { storeToRefs } from 'pinia'
import { effect } from 'vue'
import { theme } from 'ant-design-vue'

const { showDynamicTitle, primaryColor, dark } = storeToRefs(useSystemStore())
const { currentRouteTitle } = storeToRefs(useTagStore())
const { defaultTitle } = useTagStore()

effect(() => {
	if (showDynamicTitle.value) {
		document.title = `${defaultTitle} - ${currentRouteTitle.value}`
		return
	}
	document.title = defaultTitle
})
</script>

<style scoped></style>
