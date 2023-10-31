import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
	const collapsed = ref(false)
	const menuTheme = ref('dark')

	return {
		collapsed,
		menuTheme
	}
})
