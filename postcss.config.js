import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import layouts from '@webtides/layouts';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default ({ env }) => ({
	plugins: [
		postcssImport,
		tailwindcss({ config: tailwindConfig }),
		layouts(),
		postcssNested,
		autoprefixer,
		env === 'production' ? cssnano() : false,
	],
	inject: false,
	minimize: false,
	sourceMap: true,
});
