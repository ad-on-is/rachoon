import { UserType } from '~~/models/user'
import _ from 'lodash'
import { Project, ProjectType } from './project'

export type TimeTrackType = {
	id: string
	project: ProjectType
	user: UserType
	date: Date
	data: {
		title: string
		description: string
		minutes: number
	}
}

class TimeTrack implements TimeTrackType {
	id = null
	project: ProjectType = null
	user: UserType = null
	date = new Date()
	day = 0
	focused: boolean = false
	duration = ''
	data = {
		title: '',
		description: '',
		minutes: null,
	}
	selected: boolean = false
	constructor(json?: any) {
		if (json) {
			_.merge(this, json)
			if (this.data.minutes === null) {
				this.duration = '00:00'
			} else {
				const h = Math.floor(this.data.minutes / 60)
				const m = this.data.minutes % 60
				this.duration = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
			}
			this.date = new Date(Date.parse(json.date))
			this.day = this.date.getDate()
		}
	}

	public recalc() {
		if (this.duration.includes(':')) {
			this.data.minutes = Number(this.duration.split(':')[0]) * 60 + Number(this.duration.split(':')[1])
		} else {
			this.data.minutes = Number(this.duration) * 60
		}
	}

	public net() {
		return (((this.data.minutes / 60) * (this.project.data.rate || this.project.client.data.conditions.rate)) / 100) * 100 - (this.project.data.discount || 0)
	}
}

export { TimeTrack }
