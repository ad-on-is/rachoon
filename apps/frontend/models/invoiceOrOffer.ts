import { ClientType } from './client'
import _ from 'lodash'
import * as dateFns from 'date-fns'
interface Position {
	id?: number
	title: string
	text?: string
	quantity: number
	unit: string
	price: number
	tax: number
	taxPrice?: number
	discount?: number
	net?: number
	netNoDiscount?: number
	total?: number
	focused?: boolean
	totalPercentage?: number
}

interface TaxOption {
	title: String
	applicable: boolean
	default: boolean
}

interface TaxRate {
	rate: number
	default: boolean
}

interface DiscountCharge {
	id?: string
	title: string
	value: number
	type: string
	valueType: string
	amount: number
}

export type InvoiceOrOfferType = {
	id?: string
	clientId: string
	number: string
	status: string
	offerId: string
	offer: InvoiceOrOfferType
	invoices: InvoiceOrOfferType[]
	data: {
		positions: Position[]
		discountsCharges: DiscountCharge[]
		taxes: { [rate: number]: number }
		headingText: string
		footerText: string
		date: Date
		dueDate: Date
		dueDays: number
		total: number
		net: number
		netNoDiscount: number
		taxOption: TaxOption
	}

	createdAt: Date
	updatedAt: Date
	type: string
}

class InvoiceOrOffer implements InvoiceOrOfferType {
	id: string = ''
	clientId: string = null
	client: ClientType
	number: string = ''
	status: string = 'pending'
	offerId: string = null
	offer: InvoiceOrOfferType
	invoices: InvoiceOrOfferType[]
	data = {
		positions: [] as Position[],
		discountsCharges: [] as DiscountCharge[],
		taxes: {},
		date: new Date(),
		dueDate: new Date(),
		headingText: '',
		footerText: '',
		total: 0,
		dueDays: 14,
		net: 0,
		netNoDiscount: 0,
		taxOption: null,
	}

	type = ''
	createdAt: Date = new Date()
	updatedAt: Date = new Date()
	timeout: any

	constructor(json?: any) {
		if (json) {
			_.merge(this, json)

			this.data.positions.map((p) => (p.focused = false))
			this.offer = new InvoiceOrOffer(json.offer)
			this.invoices = (json.invoices || []).map((i) => new InvoiceOrOffer(i))
			this.data.date = new Date(Date.parse(json.data.date.toString()))
			this.data.dueDate = new Date(Date.parse(json.data.dueDate.toString()))
		}
	}

	public setTaxOption(option: TaxOption) {
		this.data.taxOption = option
	}

	public calcAll() {
		this.calcPositions()
		this.calcTaxes()
		this.calcNet()
		this.calcTotal()
	}

	public recalc() {
		this.data.dueDays = dateFns.differenceInCalendarDays(this.data.dueDate, this.data.date)
		if (this.data.positions.length === 0) {
			this.addPosition()
		}

		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		this.timeout = setTimeout(() => {
			this.calcAll()
		}, 100)
	}

	public errors(): string[] {
		const e = []
		if (this.clientId === null) {
			e.push('You need to select a client')
		}
		return e
	}

	public disabled = () => this.offerId !== null && this.offerId !== ''

	protected calcPositions() {
		let sumPositions = this.data.positions.reduce((p, c) => (p += c.quantity * c.price), 0)
		let sumPositionsNoDiscount = 0
		this.data.positions.map((p) => {
			p.net = p.quantity * p.price
			p.netNoDiscount = p.quantity * p.price
			sumPositionsNoDiscount += p.net
			if (p.discount > 0) {
				p.net -= (p.net / 100) * p.discount
			}
			if (this.data.taxOption?.applicable) {
				p.taxPrice = (p.net / 100) * p.tax
			} else {
				p.taxPrice = 0
			}
			p.total = p.net + p.taxPrice
			if (sumPositions === 0 || p.net === 0) {
				p.totalPercentage = 0
			} else {
				p.totalPercentage = (100 / sumPositions) * p.net
			}
			return p
		})
		this.data.netNoDiscount = sumPositionsNoDiscount
		let sumDiscountsCharges = 0

		this.data.discountsCharges.forEach((dc) => {
			const v = dc.valueType === 'percent' ? (sumPositions / 100) * dc.value : dc.value

			dc.amount = v
			if (dc.title != '' && dc.value > 0) {
				if (dc.type === 'discount') {
					sumDiscountsCharges -= v
				} else {
					sumDiscountsCharges += v
				}
			}
		})

		this.data.positions.map((p) => {
			p.net += (sumDiscountsCharges / 100) * p.totalPercentage
			if (this.data.taxOption?.applicable) {
				p.taxPrice = (p.net / 100) * p.tax
			} else {
				p.taxPrice = 0
			}
			p.total = p.net + p.taxPrice
		})
	}

	public setStatus(status: string) {
		this.status = status
	}

	protected calcTotal() {
		this.data.total = 0
		this.data.total += Math.round(this.data.net * 100) / 100
		if (this.data.taxOption?.applicable) {
			Object.keys(this.data.taxes).map((k) => {
				this.data.total += Math.round(this.data.taxes[k] * 100) / 100
			})
		}
	}

	protected calcNet() {
		this.data.net = 0
		this.data.net = this.data.positions.reduce((p, c) => (p += c.net), 0)
	}

	protected calcTaxes() {
		this.data.taxes = {}
		if (this.data.taxOption?.applicable) {
			const rates: { [_: number]: number } = {}
			this.data.positions.forEach((p) => {
				if (!rates[p.tax]) {
					rates[p.tax] = 0
				}
				rates[p.tax] += p.taxPrice
			})
			this.data.taxes = rates
		}
	}

	public addPosition(
		pos: Position = {
			id: Date.now(),
			title: '',
			text: null,
			quantity: null,
			unit: null,
			price: null,
			tax: null,
			taxPrice: null,
			discount: null,
			netNoDiscount: null,
			net: null,
			total: null,
			focused: false,
			totalPercentage: null,
		}
	) {
		this.data.positions.push({ ...pos })
	}

	public removePosition(index: number) {
		this.data.positions.splice(index, 1)

		if (this.data.positions.length === 0) {
			this.addPosition()
		}
	}

	public removePositions() {
		this.data.positions.splice(0, this.data.positions.length)
	}

	public removeDiscountCharge(index: number) {
		this.data.discountsCharges.splice(index, 1)
	}

	public addDiscountCharge(
		d: DiscountCharge = {
			id: Date.now().toString(),
			title: '',
			value: null,
			type: 'discount',
			valueType: 'percent',
			amount: 0,
		}
	) {
		this.data.discountsCharges.push(d)
	}

	public focusPosition(index: number) {
		this.data.positions.map((p) => (p.focused = false))
		this.data.positions[index].focused = true
	}
}

export { InvoiceOrOffer, TaxOption, TaxRate, Position }
