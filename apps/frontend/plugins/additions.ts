import Notification from '@kyvg/vue3-notification'
import Maska from 'maska'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Notification)
	nuxtApp.vueApp.use(Maska)
	// nuxtApp.vueApp.directive('cleave', {
	// 	mounted: (el, binding) => {
	// 		el.cleave = new Cleave(el, binding.value || {})
	// 	},
	// 	updated: (el, binding) => {
	// 		const event = new Event('input', { bubbles: true })
	// 		setTimeout(function () {
	// 			el.value = el.cleave.properties.result
	// 			el.dispatchEvent(event)
	// 		}, 100)
	// 	},
	// })
})
