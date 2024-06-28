import { html } from '@webtides/element-js';
import isAuthenticated from '../../../util/isAuthenticated.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Edit User',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`<users-edit-page></users-edit-page>`;
	}
}
