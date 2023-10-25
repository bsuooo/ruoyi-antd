import Cookies from 'js-cookie'

export const getToken = () => {
	return Cookies.get('token')
}

export const setToken = (token: string) => {
	Cookies.set('token', token)
}

export function removeToken() {
	return Cookies.remove('token')
}
