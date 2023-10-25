import * as VueRouter from 'vue-router'
import login from '@/pages/login/index.vue'
import home from '@/pages/home/index.vue'
import NProcess from 'nprogress'

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
	NProcess.start()
	if (to.name !== 'login') {
		next()
	} else {
		next()
	}
})

router.afterEach(() => {
	NProcess.done()
})
