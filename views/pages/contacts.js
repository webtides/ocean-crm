import { html } from '@webtides/element-js/src/renderer/vanilla/index.js';
import isAuthenticated from '../util/isAuthenticated.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Contacts',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`<contacts-page></contacts-page>`;
	}
}
