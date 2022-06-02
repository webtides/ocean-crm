import { html } from '@webtides/element-js/src/renderer/vanilla';
import isAuthenticated from "../util/isAuthenticated";

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
