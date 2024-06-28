import tailwindTypography from '@tailwindcss/typography';

export default {
	sourceType: 'module',
	content: ['./views/**/*.js'],
	theme: {
		extend: {
			colors: {
				// danube
				primary: {
					DEFAULT: '#6A9FD0',
					50: '#F6F9FC',
					100: '#E6EFF7',
					200: '#C7DBED',
					300: '#A8C7E4',
					400: '#89B3DA',
					500: '#6A9FD0',
					600: '#3F84C3',
					700: '#306799',
					800: '#234A6F',
					900: '#152E44',
				},
				// calypso
				secondary: {
					DEFAULT: '#376496',
					50: '#A6C1DE',
					100: '#97B6D9',
					200: '#79A1CE',
					300: '#5C8DC3',
					400: '#4278B4',
					500: '#376496',
					600: '#28496D',
					700: '#192D44',
					800: '#0A121B',
					900: '#000000',
				},
			},
		},
	},
	plugins: [
		tailwindTypography,
		// require('@tailwindcss/forms')
	],
	corePlugins: {
		container: false,
	},
};
