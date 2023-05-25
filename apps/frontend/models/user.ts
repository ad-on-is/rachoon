import { Organization } from '~~/models/organization'
import _ from 'lodash'
interface UserData {
	username: string
	fullName: string
	avatar: string
	rate: number
}

type UserType = {
	id: string
	createdAt: Date
	updatedAt: Date
	email: string
	data: UserData
	password: string
	minutes: number
	role: string
}

class User implements UserType {
	id: string = null
	role: string = ''
	password: string = null
	createdAt: Date = new Date()
	updatedAt: Date = new Date()
	email: string = ''
	minutes: number = null
	net: number = 0
	data: UserData = {
		username: '',
		fullName: '',
		avatar: '',
		rate: null,
	}
	duration?: string
	initials = () => {
		const s = this.data.fullName.split(' ')
		return s.length > 1
			? s[0].charAt(0).toUpperCase() + s[1].charAt(0).toUpperCase()
			: s[0].charAt(0).toUpperCase() + s[0].charAt(1).toUpperCase()
	}
	organization: Organization = new Organization()

	constructor(json?: any) {
		if (json) {
			_.merge(this, json)
			this.organization = new Organization(this.organization)
			if (this.minutes === null) {
				this.duration = '00h:00m'
			} else {
				const h = Math.floor(this.minutes / 60)

				const m = this.minutes % 60
				this.duration = `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m`
			}
			if (this.minutes !== null && this.data.rate !== null) {
				this.net = (this.minutes / 60) * this.data.rate
			}
		}
	}
}

export { User, UserData, UserType }
