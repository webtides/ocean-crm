import { html } from '@webtides/element-js/src/renderer/vanilla';

export default class {
	properties() {
		return {
			title: 'Edit Contact',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`<contacts-edit-page></contacts-edit-page>`;
	}
}
