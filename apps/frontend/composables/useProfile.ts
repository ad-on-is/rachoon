import { User } from '~~/models/user'

export default defineStore('profile', () => {
	let me = ref(new User())
	const loading = ref(false)
	const newPassword = ref(null)
	const newPasswordRepeat = ref(null)
	const init = async () => {
		loading.value = true
		try {
			if (useAuth().key() && me.value.id === null) {
				Object.assign(me.value, await useApi().profile().get())
			}
		} catch (e) {
			console.error('useProfile', e)
		}
		loading.value = false
	}

	async function save(e: Event) {
		e.preventDefault()
		useApi().profile().save(me.value)
	}

	async function selectFile(e) {
		const file = e.target.files[0]

		/* Make sure file exists */
		if (!file) return
		const readData = (f): Promise<any> =>
			new Promise((resolve) => {
				const reader = new FileReader()
				reader.onloadend = () => resolve(reader.result)
				reader.readAsDataURL(f)
			})
		const data = await readData(file)
		const size = data.length / 1024
		if (size > 5) {
			useNotification().notify({
				title: 'Invalid image',
				text: 'The image is too large.',
				type: 'error',
			})
			return
		} else {
			useProfile().me.data.avatar = data as string
		}
	}

	async function savePassword(e: Event) {
		e.preventDefault()
		if (newPassword.value !== newPasswordRepeat.value) return
		useApi().profile().savePassword(newPassword.value)
	}

	return {
		me,
		newPassword,
		newPasswordRepeat,
		init,
		save,
		savePassword,
		selectFile,
	}
})
