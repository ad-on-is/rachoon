import { InvoiceOrOffer } from '~~/models/invoiceOrOffer'
import _ from 'lodash'

class Dashboard {
	invoices = {
		net: 0,
		total: 0,
		pending: [] as InvoiceOrOffer[],
	}
	offers = {
		net: 0,
		total: 0,
		pending: [] as InvoiceOrOffer[],
	}

	timetracks = {
		minutes: 0,
		net: 0,
	}

	constructor(json?: any) {
		if (json) {
			_.merge(this, json)
			this.invoices.pending = this.invoices.pending.map((i) => new InvoiceOrOffer(i))
			this.offers.pending = this.offers.pending.map((i) => new InvoiceOrOffer(i))
		}
	}
}

export { Dashboard }
