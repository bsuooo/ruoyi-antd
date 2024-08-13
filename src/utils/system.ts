import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token: string) {
  Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}
