import { BaseElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class ResourcePreviewLink extends BaseElement {
	properties() {
		return {
			apiLink: undefined,
		};
	}

	events() {
		return {
			this: {
				click: async (e) => {
					e.preventDefault();

					const response = await fetch(this.apiLink);
					const json = await response.json();

					const dialog = document.querySelector('resource-preview-dialog');
					dialog.open(json);
				},
			}
		}
	}
}
