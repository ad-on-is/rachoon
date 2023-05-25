import { Project } from '~~/models/project'
import { Client } from '~~/models/client'
import * as dateFns from 'date-fns'

export default defineStore('client', () => {
	const type = 'clients'
	let clients = ref([])

	const hasErrors = ref(false)

	const singularType = type.slice(0, type.length - 1)

	const title = ref()

	const loading = ref(false)
	const client = ref(new Client())
	const projects = ref([])

	function projectNumber(project: Project) {
		let number = ''
		if (useClient().client.name.includes(' ')) {
			number = useClient()
				.client.name.split(' ')
				.reduce((p, c) => (p += c.charAt(0).toUpperCase()), '')
		} else {
			number = useClient().client.name.charAt(0).toUpperCase() + useClient().client.name.charAt(1).toUpperCase()
		}
		if (project.data.title.includes(' ')) {
			number += project.data.title.split(' ').reduce((p, c) => (p += c.charAt(0).toUpperCase()), '')
		} else {
			number += project.data.title.charAt(0).toUpperCase() + project.data.title.charAt(1).toUpperCase()
		}
		return number
	}

	async function save(e: Event) {
		e.preventDefault()
		if (client.value.errors().length > 0) {
			hasErrors.value = true
			return
		}
		hasErrors.value = false
		const isNew = client.value.id === ''
		const c = await useApi().clients().saveOrUpdate(client.value, !isNew)
		if (isNew) {
			useRouter().replace(`/${type}/${c.id}`)
		}
	}

	async function deleteProject(project: Project) {
		await useApi().projects().delete(project.id)
		projects.value = projects.value.filter((p) => p.id !== project.id)
	}

	async function saveProject(project: Project) {
		const p = await useApi()
			.projects({ client: useClient().client })
			.saveOrUpdate({ ...project, number: project.number + '-' + (await useApi().projects().count()) }, false)

		projects.value.push(p)
	}

	async function list() {
		loading.value = true
		clients.value = await useApi().clients().getAll()
		loading.value = false
	}

	async function form() {
		const id = useRoute().params['id'] as string

		loading.value = true
		if (id === 'new') {
			const count = (await useApi().clients().count()) + 1
			client.value = new Client()
			client.value.number = useSettings().settings.numberFormat('clients', count)
			title.value = client.value.number
		} else {
			client.value = Object.assign(client.value, await useApi().clients().get(id))
			title.value = 'Edit: ' + client.value.number
			getProjects()
		}

		loading.value = false
	}

	async function getProjects() {
		projects.value = await useApi().projects({ client: client.value }).getAllForClient()
	}
	return {
		client,
		save,
		saveProject,
		form,
		loading,
		title,
		clients,
		singularType,
		list,
		hasErrors,
		projects,
		projectNumber,
		deleteProject,
	}
})
