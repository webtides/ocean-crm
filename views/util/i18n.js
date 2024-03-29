/**
 * Retrieves a translated key from a dictionary on the window object
 * Example: ${i18n('CustomElement.buttonLabel', 'Label')}
 * @param key to be translated
 * @param fallback to be used if key is not defined
 * @return String of the translated key or fallback or original key
 */
export function i18n(key, fallback) {
	try {
		const translations = globalThis.elementjs.i18n();
		if (translations[key] === undefined) {
			throw 'Translation Missing';
		}

		return translations[key];
	} catch (err) {
		if (fallback) return fallback;
		else return key;
	}
}
