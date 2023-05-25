import * as locale from 'date-fns/locale'
import * as dateFns from 'date-fns'

function toCurrency(value: any) {
	const formatter = new Intl.NumberFormat(useSettings().settings.general.locale, {
		style: 'currency',
		currency: useSettings().settings.general.currency,
	})

	return formatter.format(Number(value))
}

function getLocale() {
	const s = useProfile().me.organization.settings.general.locale.split('-')

	return s.length > 1 ? `${s[0]}${s[1].toUpperCase()}` : s[0]
}

function date(value: any) {
	const loc = locale[getLocale() || 'enUS']
	return dateFns.format(Date.parse(value), 'P', { locale: loc })
	// const formatter = new Intl.DateTimeFormat(useSettings().settings.general.locale)
	// return formatter.format(Date.parse(value))
}

function longDate(value: any) {
	const loc = locale[getLocale() || 'enUS']
	return dateFns.format(Date.parse(value), 'PPPP', { locale: loc })
}

function timeTrackDuration(val: string) {
	// if (val.startsWith('0') && !val.startsWith('00') && val.length >= 4) val = [val.slice(0, -3), ':', val.slice(-3)].join('')
	// if (!val.includes(':') && val.length >= 4) return val.substring(0, 4)
	if (val.includes(':')) {
		const split = val.split(':')
		split[1] = split[1].slice(0, 2)
		if (~~split[1] > 59) split[1] = '59'
		val = `${split[0].padStart(2, '0')}:${split[1].padStart(2, '0')}`
	} else {
		if (val.startsWith('00') && val.length >= 4) val = val.replace('00', '00:')
		if (val.length >= 4) {
			val = val.substring(0, val.length - 2) + ':' + val.substring(val.length - 2)
		}
	}
	return val
}

function max100(val: string) {
	if (Number(val) > 100) val = '100'
	return val
}

function durationToHM(val: string) {
	const split = val.split(':')
	const h = split[0]
	const m = split[1]
	return `${h.padStart(2, '0')}h:${m.padStart(2, '0')}m`
}

function minutesToHM(minutes: number) {
	const h = Math.floor(minutes / 60)
	const m = minutes % 60
	return `${h.toString().padStart(2, '0')}h:${m.toString().padStart(2, '0')}m`
}

export default { toCurrency, date, longDate, timeTrackDuration, max100, durationToHM, minutesToHM }
