import { html } from '@webtides/element-js/src/renderer/vanilla';

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
		return html`<div>Contacts</div>`;
	}
}
