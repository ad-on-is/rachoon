import { Project } from '~~/models/project'
import { TimeTrack } from '~~/models/timeTrack'
import * as dateFns from 'date-fns'
export default defineStore('timetrack', () => {
	const timeTracks = ref([])
	const loading = ref(false)
	const projects = ref([])
	const clientId = ''
	const view = ref('month')
	const timeTrack = ref(new TimeTrack())
	const day = computed(() => dateFns.getDate(monthDate.value))
	const parsedHash = useRoute()
		.hash.substring(1)
		.split('&')
		.reduce(function (result, item) {
			var parts = item.split('=')
			result[parts[0]] = parts[1]
			return result
		}, {})
	const monthDate = ref(new Date())
	const listDate = ref([dateFns.startOfMonth(new Date()), dateFns.endOfMonth(new Date())])

	watch([monthDate, listDate, view], (_, [monthDateOld, listDateOld, viewOld]) => {
		if (viewOld !== view.value) {
			if (view.value === 'month') {
				monthDate.value = listDate.value[0]
			} else {
				listDate.value = [dateFns.startOfMonth(monthDate.value), dateFns.endOfMonth(monthDate.value)]
			}
		}
		refresh()
		getAll({ type: view.value })
	})

	function init() {
		monthDate.value = parsedHash['monthDate'] ? new Date(parsedHash['monthDate']) : new Date()
		listDate.value = [
			parsedHash['listDateStart'] ? new Date(parsedHash['listDateStart']) : new Date(),
			parsedHash['listDateEnd'] ? new Date(parsedHash['listDateEnd']) : new Date(),
		]
		getAll()
	}

	function setDay(newDay: number) {
		monthDate.value = dateFns.setDate(monthDate.value, newDay)
		refresh()
	}

	function refresh() {
		window.location.href = `#monthDate=${dateFns.formatISO(monthDate.value, { representation: 'date' })}&listDateStart=${dateFns.formatISO(listDate.value[0], {
			representation: 'date',
		})}&listDateEnd=${dateFns.formatISO(listDate.value[1], { representation: 'date' })}`
	}

	function setMonthDate(date: Date) {
		monthDate.value = date
	}

	function setListDate(date: Date[]) {
		listDate.value = date
	}

	async function getAll(opts: { clientId?: string; type: string } = { clientId: null, type: 'month' }) {
		const range =
			opts.type === 'month'
				? { startDate: dateFns.startOfMonth(monthDate.value), endDate: dateFns.endOfMonth(monthDate.value) }
				: { startDate: listDate.value[0], endDate: listDate.value[1] }
		loading.value = true
		timeTracks.value = await useApi()
			.timeTracks()
			.getAll({ clientId: opts.clientId, ...range })
		projects.value = await useApi().projects().getAll()
		loading.value = false
	}

	async function getForImport() {
		loading.value = true
		timeTracks.value = await useApi().timeTracks().getAll({ clientId: useInvoiceOrOffer().invoiceOrOffer?.client?.id, startDate: listDate.value[0], endDate: listDate.value[1] })
		loading.value = false
	}

	async function save() {
		if (timeTrack.value.project === null) {
			useNotification().notify({
				title: 'Error',
				text: 'Please select a project',
				type: 'error',
			})
			return
		}
		timeTrack.value.date = monthDate.value
		const tt = await useApi()
			.timeTracks(timeTrack.value.project)
			.saveOrUpdate(timeTrack.value, timeTrack.value.id !== null)
		timeTracks.value.push(tt)
		Object.assign(timeTrack.value, new TimeTrack())
	}

	async function download(timeTracks: any[]) {
		const data = (await useRender({ timeTracks: timeTracks, totalMinutes: timeTracks.reduce((a, b) => a + b.data.minutes, 0) }, false, 'timeTracks')) as string
		let a = document.createElement('a')
		const name = `timeTracks_${timeTracks[0].project.client.id}_${dateFns.format(timeTracks[timeTracks.length - 1].date, 'yyyy-MM-dd')}-${dateFns.format(
			timeTracks[0].date,
			'yyyy-MM-dd'
		)}.pdf`
		a.href = data
		a.download = name
		a.click()
	}

	async function update(t: TimeTrack) {
		t.recalc()
		await useApi().timeTracks().saveOrUpdate(t, true)

		timeTracks.value.map((t) => (t.focused = false))
	}

	async function setProject(project: Project) {
		timeTrack.value.project = project
	}

	function toggleAll(selected: boolean) {
		timeTracks.value.map((t) => (t.selected = selected))
	}

	function focus(id: string) {
		timeTracks.value.map((t) => (t.focused = false))
		timeTracks.value.filter((t) => t.id === id)[0].focused = true
	}

	function esc() {
		timeTracks.value.map((t) => (t.focused = false))
	}

	return {
		setProject,
		save,
		focus,
		update,
		toggleAll,
		getForImport,
		setDay,
		init,
		getAll,
		day,
		loading,
		timeTracks,
		projects,
		timeTrack,
		monthDate,
		listDate,
		view,
		setMonthDate,
		setListDate,
		esc,
		download,
	}
})
