import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User, LoginForm } from '@/pages/login/types/index'
import { login as loginApi } from '@/pages/login/api/index'
import { message } from 'ant-design-vue'

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<User>()
	const token = ref<string>()

	function login(loginForm: LoginForm) {
		return new Promise((resolve, reject) => {
			loginApi(loginForm)
				.then((res) => {
					token.value = res.token
					sessionStorage.setItem('token', res.token)
					message.success('登录成功')
					resolve(res)
				})
				.catch(() => {
					reject()
				})
		})
	}

	return {
		userInfo,
		token,
		login
	}
})
