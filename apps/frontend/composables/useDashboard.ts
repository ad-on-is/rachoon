import { Dashboard } from '~~/models/dashboard'

export default defineStore('dashboard', () => {
	const dashboard = ref(new Dashboard())
	const loading = ref(true)
	const get = async () => {
		loading.value = true
		dashboard.value = await useApi().dashboard().get()
		loading.value = false
	}

	return {
		loading,
		get,
		dashboard,
	}
})
