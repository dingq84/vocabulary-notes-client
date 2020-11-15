module.exports = {
	purge: [
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'black-1': '#1D1D23',
				'black-2': '#28282A',
				'black-3': '#686668',
			},
		},
	},
	variants: {},
	plugins: [],
}
