import _ from 'lodash'
import { Project } from './project'
interface ClientData {
	info: {
		vat: string
		addition: string
	}
	address: {
		street: string
		zip: string
		city: string
		country: string
	}
	contactPerson: {
		fullName: string
		email: string
	}
	conditions: {
		earlyPayment: {
			discount: number
			days: number
		}
		invoiceDueDays: number
		rate: number
		discount: {
			value: number
			valueType: string
		}
	}
}

export type ClientType = {
	id: string
	name: string
	number: string
	createdAt: Date
	updatedAt: Date
	data: ClientData
	totalInvoices: number
	pendingInvoices: number
	totalOffers: number
	totalProjects: number
	pendingOffers: number
	projects: Project[]
}

class Client implements ClientType {
	id: string = ''
	name: string = ''
	number: string = ''
	createdAt: Date = new Date()
	updatedAt: Date = new Date()
	data: ClientData = {
		address: { street: '', zip: '', city: '', country: '' },
		info: { vat: '', addition: '' },
		contactPerson: { fullName: '', email: '' },
		conditions: {
			earlyPayment: { days: null, discount: null },
			invoiceDueDays: null,
			rate: null,
			discount: { value: null, valueType: 'percent' },
		},
	}
	minutes: number = 0
	projects: Project[] = []
	totalInvoices: number = 0
	pendingInvoices: number = 0
	totalOffers: number = 0
	totalProjects: number = 0
	pendingOffers: number = 0
	duration: string = '00h:00m'

	public constructor(json?: ClientType) {
		if (json) {
			_.merge(this, json)
			if (this.minutes === null) {
				this.duration = '00h:00m'
			} else {
				const h = Math.floor(this.minutes / 60)

				const m = this.minutes % 60
				this.duration = `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m`
			}
		}
	}

	public errors(): string[] {
		const e = []
		if (this.name === '') {
			e.push('Name is required')
		}

		if (this.data.contactPerson.email == '') {
			e.push('E-mail is required')
		}

		return e
	}
}

export { Client }
