module.exports = ({ env }) => ({
	plugins: [
		require('postcss-import'),
		require('tailwindcss')({ config: 'tailwind.config.js' }),
		require('@webtides/layouts').default(),
		require('postcss-nested'),
		require('autoprefixer'),
		env === 'production'
			? require('@fullhuman/postcss-purgecss')({
				content: ['./views/**/*.js'],
				safelist: [/col-start-/, /col-end-/, /row-start/, /row-end/, /:host/],
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			  })
			: false,
		env === 'production' ? require('cssnano')() : false,
	],
	inject: false,
	minimize: false,
	sourceMap: true,
});
