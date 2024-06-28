import { html } from '@webtides/element-js';
import isAuthenticated from '../util/isAuthenticated.js';
import isAuthorized from '../util/isAuthorized.js';

export const middleware = async () => {
	return [isAuthenticated, isAuthorized('Admin')];
};

export default class {
	properties() {
		return {
			title: 'Settings',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`
			<div>The settings page can only be shown for admin users</div>
			<div class="mt-10"></div>
		`;
	}
}
