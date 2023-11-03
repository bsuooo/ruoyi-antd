import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
	const collapsed = ref(false)
	const menuTheme = ref('dark')
	const showRightLogo = ref(true)
	const showTagsView = ref(true)

	const menuBgColor = computed(() => {
		return menuTheme.value === 'dark' ? '#001529' : '#fff'
	})

	const MenuFtColor = computed(() => {
		return menuTheme.value === 'dark' ? '#fff' : '#001529'
	})

	return {
		collapsed,
		menuTheme,
		menuBgColor,
		MenuFtColor,
		showRightLogo,
		showTagsView
	}
})
