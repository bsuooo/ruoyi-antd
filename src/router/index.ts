import * as VueRouter from 'vue-router'
import login from '@/pages/login/index.vue'
import home from '@/pages/home/index.vue'
import layout from '@/pages/layout/index.vue'
import NProcess from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/system'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { getInfo, getRouters } from '@/pages/login/api/index'
import { GetRoutersResult, GetInfoResult } from '@/pages/login/types/index'
import { useMenuStore } from '@/store/menu'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: login
	},
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home
      }
    ]
  },
]

export const router = VueRouter.createRouter({
	routes,
	history: VueRouter.createWebHashHistory()
})

router.beforeEach((to, from, next) => {
	const { roles, userInfo, permissions } = storeToRefs(useUserStore())
	const menuStore = useMenuStore()
	NProcess.start()
	if (to.name !== 'login') {
		if (!getToken()) {
			next({ name: 'login' })
			return
		}
		if (roles.value.length === 0) {
			getUserInfoAndRouterList()
				.then((res) => {
					const [user, routerList] = res
					const { user: u, roles: r, permissions: p } = user
					userInfo.value = u
					roles.value = r
					permissions.value = p
					menuStore.generateRoute(routerList.data)
          // 刷新时，重新跳转到当前路由
					next({ ...to, replace: true })
				})
				.catch((e) => {
					console.log(e)
					next({ name: 'login' })
				})
				.finally(() => {
					NProcess.done()
				})
		} else {
			next()
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
	return new Promise<GetInfoResult>((resolve, reject) => {
		getInfo()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export const getRouterList = () => {
	return new Promise<GetRoutersResult>((resolve, reject) => {
		getRouters()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

type AllResult = [GetInfoResult, GetRoutersResult]
export const getUserInfoAndRouterList = () => {
	const promiseList = [getUserInfo(), getRouterList()]
	return new Promise<AllResult>((resolve, reject) => {
		Promise.all(promiseList)
			.then((res) => {
				resolve(res as AllResult)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
