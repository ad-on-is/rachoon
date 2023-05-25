import camelcaseKeys from 'camelcase-keys'

type FetchMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options'

export default class HttpClient {
	public static get = async (url: string, notify: false | { title: string; text: string; type?: string } = false) => await this.doFetch(url, { method: 'get' }, notify)
	public static del = async (url: string, notify: false | { title: string; text: string; type?: string } = false) => await this.doFetch(url, { method: 'delete' }, notify)
	public static post = async (url: string, data: any, notify: false | { title: string; text: string; type?: string } = false) =>
		await this.doFetch(url, { method: 'post', body: data }, notify)
	public static put = async (url: string, data: any, notify: false | { title: string; text: string; type?: string } = false) =>
		await this.doFetch(url, { method: 'put', body: data }, notify)

	public static doFetch = async (url: string, opts: { method: FetchMethod; body?: any }, notify: false | { title: string; text: string; type?: string } = false) => {
		const baseUrl = useRuntimeConfig().public.apiURL
		try {
			const res = await $fetch.raw(`${baseUrl}${url}`, {
				method: opts.method,
				body: JSON.stringify(opts.body),
				headers: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${useAuth().key()}`,
				},
			})

			if (notify) {
				useNotification().notify({ title: notify.title, text: notify.text, type: notify.type })
			}
			return camelcaseKeys(res._data, { deep: true })
		} catch (e) {
			this.notifyError(e)

			return {}
		}
	}

	private static notifyError(e: any) {
		let title = 'Error'
		let message = 'Unexpected error occured'

		if (e.data) {
			if (e.data?.errors[0]?.message.includes('E_INVALID_AUTH_PASSWORD')) {
				title = 'Invalid credentials'
				message = 'Email and password do not match'
			}
		}

		useNotification().notify({
			title: title,
			text: message,
			type: 'error',
		})
	}
}
