// import { html } from '@webtides/element-js/src/renderer/vanilla';

const layout = (page, context = {}) => {
	const now = Date.now();

	const currentPath = context.request?.url || '/';
	const navLinkActiveClasses = 'border-primary-500 text-gray-900';
	const navLinkDefaultClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

	return `
		<!DOCTYPE html>
		<html lang="" class="h-full bg-gray-100">
			<head>
				<title>${context.title ? `${context.title} | Ocean CRM` : 'Ocean CRM'}</title>

				<meta charset="UTF-8" />
				<link href="/assets/css/main.css?${now}" type="text/css" rel="stylesheet" />
				<link href="/assets/css/base.css?${now}" type="text/css" rel="stylesheet" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				${context.head ?? ''}
			</head>
			<body class="h-full">
				<div class="min-h-full">
					<main class="py-10">
						<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<flash-message></flash-message>
							<div class="mt-6">${page ?? ''}</div>
						</div>
					</main>
				</div>
			</body>
		</html>
	`;
};

export default layout;
