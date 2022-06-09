import { html } from '@webtides/element-js/src/renderer/vanilla';
import isAuthenticated from '../util/isAuthenticated';
import isAuthorized from "../util/isAuthorized";

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
