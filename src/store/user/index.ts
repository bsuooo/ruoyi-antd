import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User, Route } from '@/pages/login/types/index'

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<User>()
	const token = ref<string>()
	const roles = ref<string[]>([])
	const routes = ref<Route>()
	const permissions = ref<string[]>([])

	function formatRoutes(r: Route) {
		routes.value = r
	}

	return {
		userInfo,
		token,
		roles,
		permissions,
		formatRoutes
	}
})
