import * as VueRouter from 'vue-router'
import login from '@/pages/login/index.vue'
import home from '@/pages/home/index.vue'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: login
	},
	{
		path: '/home',
		name: 'home',
		component: home
	}
]

export const router = VueRouter.createRouter({
	routes,
	history: VueRouter.createWebHashHistory()
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'login') {
		next()
	} else {
		next()
	}
})
