module.exports = {
	content: ['./views/**/*.js'],
	theme: {
		extend: {
			colors: {
				primary: '#04828c',
				'primary-hover': '#015469',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
	corePlugins: {
		container: false,
	},
};
