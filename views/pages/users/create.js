import { html } from '@webtides/element-js/src/renderer/vanilla';
import isAuthenticated from "../../util/isAuthenticated";

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Create User',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`<users-edit-page></users-edit-page>`;
	}
}
