import { Project } from '~~/models/project'
import { User } from '~~/models/user'

export default defineStore('user', () => {
	const type = 'users'
	let users = ref([])
	const user = ref(new User())
	const title = ref()
	const password = ref(null)
	const passwordRepeat = ref(null)
	const projects = ref([])
	const allProjects = ref([])
	const singularType = type.slice(0, type.length - 1)

	const loading = ref(false)

	async function save(e: Event) {
		e.preventDefault()

		const isNew = user.value.id === null
		if (password.value !== passwordRepeat.value) return
		const u = await useApi()
			.users()
			.saveOrUpdate(isNew ? { ...user.value, password: password.value } : user.value, !isNew)
		if (isNew) {
			useRouter().replace(`/${type}/${u.id}`)
		}
	}

	async function list() {
		loading.value = true
		users.value = await useApi().users().getAll()
		loading.value = false
	}

	async function assignProject(project: Project) {
		await useApi().projects({ user: user.value }).assignToUser(project.id)
		projects.value.push(project)
	}

	async function unassignProject(project: Project) {
		await useApi().projects({ user: user.value }).unassignFromUser(project.id)
		projects.value = projects.value.filter((p) => p.id !== project.id)
	}

	async function form() {
		const id = useRoute().params['id'] as string

		loading.value = true
		if (id === 'new') {
			user.value = new User()
			title.value = 'New user'
		} else {
			user.value = Object.assign(user.value, await useApi().users().get(id))
			projects.value = await useApi().projects({ user: user.value }).getAllForUser()
			allProjects.value = await useApi().projects().getAll()
			title.value = 'Edit: ' + user.value.data.fullName
		}

		loading.value = false
	}

	return {
		users,
		user,
		save,
		form,
		loading,
		singularType,
		password,
		passwordRepeat,
		list,
		title,
		projects,
		allProjects,
		assignProject,
		unassignProject,
	}
})
