import * as VueRouter from "vue-router"
import login from "@/pages/login/index.vue"

const routes = [
	{
		path: "/login",
		name: "login",
		component: login
	}
]

export const router = VueRouter.createRouter({
	routes,
	history: VueRouter.createWebHashHistory()
})

router.beforeEach((to, from, next) => {
	if (to.name !== "login") {
		next({ name: "login" })
	} else {
		next()
	}
})
