import nunjucks from 'nunjucks'
import ioTemplates from '@/templates/invoiceOrOffer'
import ttTemplate from '@/templates/timeTracks'

export default async function useRender(object: any, preview: boolean = false, type: string = 'invoiceOrOffer'): Promise<string | string[]> {
	const t = (key: string, ...val: any): string => {
		return useLocale.t(key, val)
	}

	const html = type === 'invoiceOrOffer' ? useSettings().settings.style.template || ioTemplates.default : ttTemplate.default
	const final = await nunjucks.renderString(html, {
		object: object,
		organization: useProfile().me.organization,
		user: useProfile().me,
		t: t,
		format: {
			currency: useFormat.toCurrency,
			date: useFormat.date,
			duration: useFormat.minutesToHM,
		},
	})

	return await useHttp.post(`/api/render${preview ? '?preview=true' : ''}`, {
		html: final,
	})
}
