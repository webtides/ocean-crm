import path from 'node:path';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

export default {
	port: SERVER_PORT,

	build: {
		output: '.build',

		server: {
			resolveNodeModules: ['@webtides/element-js', '@prisma/client'],
		},
	},

	pages: {
		input: [path.join(process.cwd(), 'views/pages')],
		factory: '@webtides/luna-renderer/src/element-js/index.js',
		fallback: '/fallback',
	},

	layouts: {
		input: [path.join(process.cwd(), 'views/layouts')],
	},

	api: {
		input: [path.join(process.cwd(), 'api')],
	},

	components: {
		bundles: [
			{
				input: path.join(process.cwd(), 'views/components'),
				output: 'assets',

				styles: {
					output: 'assets/css/base.css',
				},
				factory: '@webtides/luna-renderer/src/element-js/index.js',
			},
		],
	},

	hooks: {
		input: [path.join(process.cwd(), 'hooks')],
	},

	assets: {
		styles: {
			bundles: [
				{
					input: [path.join(process.cwd(), 'assets/css/main.css')],

					output: 'assets/css/main.css',
					plugins: () => [],
				},
				{
					input: [path.join(process.cwd(), 'assets/css/mail.css')],

					output: 'assets/css/mail.css',
					plugins: () => [],
				},
			],
		},

		static: {
			sources: [
				{
					input: 'node_modules/heroicons/**/*.svg',
					output: 'assets/heroicons',
				},
				{
					input: 'assets/images/**/*',
					output: 'assets/images',
				},
			],
		},
	},

	export: {
		output: '.export',

		api: {
			output: {
				directory: '.api',
				filename: 'api-server.js',
			},
		},
	},
};
