import { Route } from '@/pages/login/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
	const menu = ref<Route[]>([])

	// const router = useRouter()

	function generateRoute(routes: Route[]) {
		formatRoutes(routes)
		// registerRoutes(routes)
		menu.value = routes
	}

	function formatRoutes(r: Route[], parentRoute?: Route) {
		r.forEach((route) => {
			if (parentRoute) {
				route.path = `${parentRoute.path}${route.path}`
			}
			if (route.children && route.children.length > 0) {
				formatRoutes(route.children, route)
			}
		})
	}

	// function registerRoutes(routes: Route[]) {
	// 	routes.forEach((route) => {
	// 		router.addRoute(route)
	// 	})
	// }

	return {
		menu,
		formatRoutes,
		generateRoute
	}
})
