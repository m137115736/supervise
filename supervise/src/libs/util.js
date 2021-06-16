import Cookies from 'js-cookie'
export const TOKEN_KEY = 'superviseUser'

export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token)
}
export const logOut = (token) => {
	Cookies.remove(TOKEN_KEY)
}
// JSON.parse()
export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY)
	if (token) return JSON.parse(token)
	else return false
}
