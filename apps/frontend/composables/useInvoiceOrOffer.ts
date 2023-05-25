import { ProjectType } from '~~/models/project'
import { TimeTrack } from '~~/models/timeTrack'
import { ClientType } from '~~/models/client'
import { InvoiceOrOffer } from '~~/models/invoiceOrOffer'

import * as dateFns from 'date-fns'

export default defineStore('invoiceOrOffer', () => {
	const type = () => useRoute().path.split('/')[1]
	const singularType = () => type().slice(0, type().length - 1)
	const invoicesOrOffers = ref([])
	const invoiceOrOffer = ref(new InvoiceOrOffer())
	const clients = ref([])
	const hasErrors = ref(false)
	const title = ref()
	const mustSave = ref(0)
	const offerToConvert = ref(new InvoiceOrOffer())

	const loading = ref(false)

	function setClient(client: ClientType) {
		invoiceOrOffer.value.clientId = client.id
		invoiceOrOffer.value.client = client
		if (client.data.conditions.discount.value > 0) {
			client.data.conditions.discount.value,
				client.data.conditions.discount.valueType,
				invoiceOrOffer.value.addDiscountCharge({
					id: Date.now().toString(),
					title: 'Client discount',
					type: 'discount',
					value: client.data.conditions.discount.value,
					valueType: client.data.conditions.discount.valueType,
					amount: 0,
				})
		}
		if (invoiceOrOffer.value.data.positions[0].price === null && invoiceOrOffer.value.data.positions[0].quantity === null) {
			invoiceOrOffer.value.removePosition(0)
		}
		invoiceOrOffer.value.recalc()
	}

	function offerToInvoice(io: InvoiceOrOffer) {}

	function setStatus(io: InvoiceOrOffer) {
		const status = io.status === 'pending' ? (io.type === 'invoice' ? 'paid' : 'accepted') : 'pending'
		io.setStatus(status)
		useApi().invoicesOrOffers(singularType()).setStatus(io.id, status)
	}

	async function save() {
		if (invoiceOrOffer.value.errors().length > 0) {
			hasErrors.value = true
			return
		}
		hasErrors.value = false
		const isNew = invoiceOrOffer.value.id === ''
		const ioo = await useApi().invoicesOrOffers(singularType()).saveOrUpdate(invoiceOrOffer.value, !isNew)
		if (isNew) {
			useRouter().replace(`/${type()}/${ioo.id}`)
		}
		mustSave.value = 0
	}

	async function list() {
		loading.value = true
		invoicesOrOffers.value = await useApi().invoicesOrOffers(singularType()).getAll()
		loading.value = false
	}

	async function preview() {
		return (await useRender(invoiceOrOffer.value, true)) as string[]
	}

	async function download(io?: InvoiceOrOffer) {
		const dio = io || invoiceOrOffer.value
		const data = (await useRender(dio)) as string
		let a = document.createElement('a')
		a.href = data
		a.download = dio.number + '.pdf'
		a.click()
	}

	function updated() {
		invoiceOrOffer.value.recalc()
		mustSave.value++
	}

	function importAsSeparateEntries(timeTracks: TimeTrack[], unit: string, tax: number, range: Date[]) {
		timeTracks.map((t) => {
			invoiceOrOffer.value.addPosition({
				title: t.data.title,
				quantity: Math.round((t.data.minutes / 60) * 100) / 100,
				price: t.project.data.rate || invoiceOrOffer.value.client.data.conditions.rate,
				unit: unit,
				tax: tax,
			})
		})
	}

	function importByProject(timeTracks: TimeTrack[], unit: string, tax: number, range: Date[]) {
		const projects: { [id: string]: { timeTracks: TimeTrack[]; project: ProjectType } } = {}
		timeTracks.map((t) => {
			if (projects[t.project.data.title]) {
				projects[t.project.data.title].timeTracks.push(t)
			} else {
				projects[t.project.data.title] = {
					timeTracks: [t],
					project: t.project,
				}
			}
		})
		Object.entries(projects).map(([i, p]) => {
			const minutes = p.timeTracks.reduce((p, c) => (p += c.data.minutes), 0)
			const text = p.timeTracks.reduce((p, c) => (p += `<p>${c.data.title}</p>${c.data.description}`), '')
			invoiceOrOffer.value.addPosition({
				title: `${p.project.number}: ${p.project.data.title}`,
				quantity: Math.round((minutes / 60) * 100) / 100,
				price: p.project.data.rate || invoiceOrOffer.value.client.data.conditions.rate,
				text: text,
				unit: unit,
				tax: tax,
			})
		})
	}

	function importAsSingleEntry(timeTracks: TimeTrack[], unit: string, tax: number, range: Date[]) {
		const minutes = timeTracks.reduce((p, c) => (p += c.data.minutes), 0)
		const text = `<ul>${timeTracks.reduce((p, c) => (p += `<li>${c.data.title}<br />${c.data.description}</li>`), '')}</ul>`
		invoiceOrOffer.value.addPosition({
			title: `Work done from ${useFormat.date(range[0])} until ${useFormat.date(range[1])}`,
			quantity: Math.round((minutes / 60) * 100) / 100,
			price: invoiceOrOffer.value.client.data.conditions.rate || null,
			text: text,
			unit: unit,
			tax: tax,
		})

		invoiceOrOffer.value.focusPosition(invoiceOrOffer.value.data.positions.length - 1)
	}

	function importFromTimeTrack(timeTracks: TimeTrack[], unit: string, tax: number, type: string, range: Date[]) {
		switch (type) {
			case 'separate-entries':
				importAsSeparateEntries(timeTracks, unit, tax, range)
				break
			case 'single-entry':
				importAsSingleEntry(timeTracks, unit, tax, range)
				break
			default:
				importByProject(timeTracks, unit, tax, range)
		}
		if (invoiceOrOffer.value.data.positions[0].price === null || invoiceOrOffer.value.data.positions[0].quantity === null) {
			invoiceOrOffer.value.removePosition(0)
		}
	}

	async function maybeDoConvertOffer() {
		if (useRoute().query.offer) {
			Object.assign(
				offerToConvert.value,
				await useApi()
					.invoicesOrOffers('offer')
					.get(useRoute().query.offer as string)
			)
			invoiceOrOffer.value.removePositions()
			offerToConvert.value.recalc()
			invoiceOrOffer.value.client = offerToConvert.value.client
			invoiceOrOffer.value.clientId = offerToConvert.value.clientId
			invoiceOrOffer.value.offerId = offerToConvert.value.id
			if (useRoute().query.option === 'partial') {
				offerToConvert.value.data.positions.map((p) => {
					if (useRoute().query.valueType === 'percent') p.price = (p.price / 100) * Number(useRoute().query.value)
					if (useRoute().query.valueType === 'fixed') p.price = ((Number(useRoute().query.value) / 100) * p.totalPercentage) / p.quantity
					p.price = Math.round(p.price * 100) / 100
					invoiceOrOffer.value.addPosition(p)
				})
			}
			if (useRoute().query.option === 'final') {
				const previousNet = offerToConvert.value.invoices.reduce((p, c) => p + c.data.net, 0)
				const newNet = offerToConvert.value.data.net - previousNet
				offerToConvert.value.data.positions.map((p) => {
					p.price = ((newNet / 100) * p.totalPercentage) / p.quantity
					p.price = Math.round(p.price * 100) / 100
					invoiceOrOffer.value.addPosition(p)
				})
			}

			if (['full', 'final'].includes(useRoute().query.option as string)) {
				offerToConvert.value.data.discountsCharges.map((d) => {
					invoiceOrOffer.value.addDiscountCharge(d)
				})
			}
			invoiceOrOffer.value.invoices = offerToConvert.value.invoices
			invoiceOrOffer.value.recalc()
		} else {
			Object.assign(offerToConvert.value, new InvoiceOrOffer())
		}
	}

	async function form() {
		loading.value = true
		clients.value = await useApi().clients().getAll()
		const id = useRoute().params['id'] as string

		if (id === 'new') {
			const count = (await useApi().invoicesOrOffers(singularType()).count()) + 1
			Object.assign(invoiceOrOffer.value, new InvoiceOrOffer())
			invoiceOrOffer.value.number = useSettings().settings.numberFormat(type(), count)
			title.value = invoiceOrOffer.value.number

			invoiceOrOffer.value.data.dueDate = dateFns.add(invoiceOrOffer.value.data.date, {
				days: useProfile().me.organization.settings.invoices.dueDays,
			})
			invoiceOrOffer.value.data.dueDays = dateFns.differenceInCalendarDays(invoiceOrOffer.value.data.dueDate, invoiceOrOffer.value.data.date)
			await maybeDoConvertOffer()
		} else {
			Object.assign(invoiceOrOffer.value, await useApi().invoicesOrOffers(singularType()).get(id))
			title.value = `Edit: ${invoiceOrOffer.value.number}`
		}
		invoiceOrOffer.value.recalc()
		if (!invoiceOrOffer.value.data.taxOption) {
			invoiceOrOffer.value.data.taxOption = useSettings().settings.taxes.options.filter((o) => o.default)[0]
		}
		mustSave.value = -1
		loading.value = false
	}

	async function del() {
		await useApi().invoicesOrOffers('invoice-or-offer').delete(invoiceOrOffer.value.id)
		useRouter().replace(`/${type()}/`)
	}
	return {
		invoiceOrOffer,
		title,
		loading,
		invoicesOrOffers,
		hasErrors,
		clients,
		mustSave,
		offerToConvert,
		del,
		importFromTimeTrack,
		save,
		form,
		type,
		singularType,
		list,
		setClient,
		preview,
		download,
		updated,
		setStatus,
		offerToInvoice,
	}
})
// some test
