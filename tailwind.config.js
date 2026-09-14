/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ink: '#15130F',
				paper: '#FAF8F3',
				sand: '#EFE9DD',
				line: '#DAD2C1',
				clay: '#8C7A5C',
				charcoal: '#4A463E',
				sage: '#6E7A5E',
				rust: '#8B4A42'
			},
			fontFamily: {
				serif: ['Fraunces', 'serif'],
				script: ['"Playfair Display"', 'serif'],
				sans: ['Karla', 'sans-serif']
			},
			letterSpacing: {
				widest2: '0.28em'
			}
		}
	},
	plugins: []
};
