/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./**/*.{vue,css,html}',
		// "./assets/**/*.{vue,js,css,scss}",
		// "./components/**/*.{vue,js}",
		// "./layouts/**/*.vue",
		// "./pages/**/*.vue",
		// "./plugins/**/*.{js,ts}",
	],

	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				'primary': '#cba6f7',
				'secondary': '#74c7ec',
				'accent': '#94e2d5',
				'neutral': '#313244',
				'base-100': '#1e1e2e',
				'info': '#74c7ec',
				'success': '#a6e3a1',
				'warning': '#f9e2af',
				'error': '#f38ba8',
			},
		},
	},
	daisyui: {
		themes: [
			'dark',
			{
				rachoon: {
					'primary': '#cba6f7',
					'secondary': '#74c7ec',
					'accent': '#94e2d5',
					'neutral': '#313244',
					'base-100': '#1e1e2e',
					'info': '#74c7ec',
					'success': '#a6e3a1',
					'warning': '#f9e2af',
					'error': '#f38ba8',
				},
			},
		],
	},
}
