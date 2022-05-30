import { html } from '@webtides/element-js/src/renderer/vanilla';

export default class {
	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`<div>Hey there! Welcome to Ocean CRM, a demo app designed to help illustrate how luna-js and element-js work.</div>`;
	}
}
