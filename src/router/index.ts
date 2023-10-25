import * as VueRouter from 'vue-router'
import login from '@/pages/login/index.vue'
import home from '@/pages/home/index.vue'
import NProcess from 'nprogress'
import { getToken } from '@/utils/system'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { getInfo, getRouters } from '@/pages/login/api/index'
import { GetRoutersResult, GetInfoResult } from '@/pages/login/types/index'

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
	const { roles, userInfo, permissions } = storeToRefs(useUserStore())
	NProcess.start()
	if (to.name !== 'login') {
		if (!getToken()) {
			next({ name: 'login' })
			return
		}
		if (roles.value.length === 0) {
			getUserInfo()
				.then((res) => {
					const { userInfo: user } = res
					const { user: u, roles: r, permissions: p } = user
					userInfo.value = u
					roles.value = r
					permissions.value = p
					next()
				})
				.catch(() => {
					next({ name: 'login' })
				})
				.finally(() => {
					NProcess.done()
				})
		}
	} else {
		next()
		NProcess.done()
	}
})

router.afterEach(() => {
	NProcess.done()
})

export const getUserInfo = () => {
	return new Promise<{ userInfo: GetInfoResult; routes: GetRoutersResult }>(
		(resolve, reject) => {
			getInfo()
				.then((res) => {
					getRouters()
						.then((r) => {
							resolve({ userInfo: res, routes: r })
						})
						.catch((err) => {
							reject(err)
						})
				})
				.catch((err) => {
					reject(err)
				})
		}
	)
}
