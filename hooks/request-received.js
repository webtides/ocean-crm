import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import { I18nService } from '../app/services/I18nService';

export const name = HOOKS.REQUEST_RECEIVED;

export default async ({ request, response }) => {
	const i18nService = new I18nService(['en', 'de'], 'en');

	const locale = request.cookies['ocean-crm-locale'] || 'en';

	const translations = i18nService.getTranslations(locale);

	globalThis.elementjs = {
		i18n: function () {
			return translations;
		},
	};
};
