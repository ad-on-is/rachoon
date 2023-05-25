export default defineStore('auth', () => {
	const loginEmailPassword = async (email: string, password: string) => {
		const res = (await useHttp.post('/api/auth', {
			email: email,
			password: password,
		})) as { token: string }

		if (res?.token) {
			localStorage.setItem('auth-token', res['token'])
			await useProfile().init()
			navigateTo('')
		}
	}

	const key = () => localStorage.getItem('auth-token')

	const logout = async () => {
		await useHttp.del('/api/auth/me')
		localStorage.removeItem('auth-token')
		navigateTo('login')
	}

	const logo = ref('')
	const loading = ref(false)

	let org = ref(null)

	async function init() {
		loading.value = true
		org.value = await useApi().organization().getCurrent()
		if (org.logo) {
			logo.value = org.logo
		}
		loading.value = false
	}

	return {
		loginEmailPassword,
		logout,
		key,
		init,
		loading,
		org,
	}
})
