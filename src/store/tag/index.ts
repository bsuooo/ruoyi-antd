import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagStore = defineStore('tag', () => {
	const currentRouteTitle = ref('首页')
	const defaultTitle = 'ruoyi-antd'

	return {
		currentRouteTitle,
		defaultTitle
	}
})
