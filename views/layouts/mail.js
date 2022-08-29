import fs from 'node:fs';

const layout = (page, context = {}) => {
	const style = fs.readFileSync(`.build/public/assets/css/mail.css`, 'utf-8');

	return `
		<!DOCTYPE html>
		<html lang="${context.locale || 'en'}" class="h-full bg-gray-100">
			<head>
				<title>${context.title ? `${context.title} | Ocean CRM` : 'Ocean CRM'}</title>

				<meta charset="UTF-8" />
				<meta name="x-apple-disable-message-reformatting">
				<meta http-equiv="x-ua-compatible" content="ie=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
				<meta name="color-scheme" content="light dark">
				<meta name="supported-color-schemes" content="light dark">

				<!--[if mso]>
				<noscript>
					<xml>
						<o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
						<o:PixelsPerInch>96</o:PixelsPerInch>
						</o:OfficeDocumentSettings>
					</xml>
				</noscript>
				<style>
					td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
				</style>
				<![endif]-->

				<style>${style}</style>

				${context.head ?? ''}
			</head>
			<body class="h-full">
				<div class="min-h-full">
					<main class="py-10">
						<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div class="mt-6">${page ?? ''}</div>
						</div>
					</main>
					<footer>
						<div class="p-8 text-center text-gray-600 text-xs">
							<p class="m-0 mb-4 uppercase">Ocean CRM</p>
							<p class="m-0 italic">A demo app designed to help demonstrate how luna-js and element-js work.</p>
							<p class="m-0 mt-4">
								<a href="https://webtides.dev" class="text-primary-500 [text-decoration:none] hover:[text-decoration:underline]">Webtides</a> &bull;
								<a href="https://github.com/webtides" class="text-primary-500 [text-decoration:none] hover:[text-decoration:underline]">Github</a> &bull;
								<a href="https://twitter.com/webtides" class="text-primary-500 [text-decoration:none] hover:[text-decoration:underline]">Twitter</a>
							</p>
						</div>
					</footer>
				</div>
			</body>
		</html>
	`;
};

export default layout;
