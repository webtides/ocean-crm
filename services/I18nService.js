import en from '../i18n/en.js';
import de from '../i18n/de.js';

export class I18nService {
	_translations = {
		en,
		de,
	};
	locales = [];
	fallback = 'en';

	constructor(locales, fallback = 'en') {
		this.locales = locales;
		this.fallback = fallback;
	}

	getLocales() {
		return this.locales;
	}

	getTranslations(locale) {
		return {
			...this._translations[this.fallback],
			...this._translations[locale],
		};
	}
}
