import { Route } from '@/pages/login/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
	const menu = ref<Route[]>([])

	const router = useRouter()

	function generateRoute(routes: Route[]) {
		formatRoutes(routes)
		menu.value = routes
	}

	function formatRoutes(r: Route[], parentRoute?: Route) {
		r.forEach((route) => {
			route.path = route.path.charAt(0) === '/' ? route.path : `/${route.path}`
			if (parentRoute) {
				route.path = `${parentRoute.path}${route.path}`
			}
			if (route.children && route.children.length > 0) {
				formatRoutes(route.children, route)
			}
			if (!route.alwaysShow) {
				const r = {
					path: route.path,
					name: route.name,
					component: () => import(`@/pages/${route.component}`),
					meta: route.meta
				}
				router.addRoute(r)
			}
		})
	}

	return {
		menu,
		formatRoutes,
		generateRoute
	}
})
