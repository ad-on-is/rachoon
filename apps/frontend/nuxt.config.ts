// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	css: ['@/assets/style.scss', '@fortawesome/fontawesome-svg-core/styles.css'],
	ssr: false,
	runtimeConfig: {
		public: {
			apiURL: process.env.API_URL || 'https://api.rachoon.work',
		},
	},

	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
			},
		],
	],
	build: {
		transpile: [
			'h3',
			'@fortawesome/vue-fontawesome',
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/free-regular-svg-icons',
			'@kyvg/vue3-notification',
			'@vuepic/vue-datepicker',
		],
		postcss: {
			postcssOptions: require('./postcss.config.js'),
		},
	},
})
