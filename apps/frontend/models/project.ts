import { Client, ClientType } from '~~/models/client'
import _ from 'lodash'

export type ProjectType = {
	id: string
	client: ClientType
	number: string
	minutes?: number

	data: {
		title: string
		description: string
		rate: number
		discount: number
	}
}

class Project implements ProjectType {
	id = ''
	client: Client = null
	duration?: string
	minutes?: number = null
	constructor(json?: ProjectType) {
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
	number: string = ''
	data = {
		title: '',
		description: '',
		rate: 0,
		discount: 0,
	}
}

export { Project }
