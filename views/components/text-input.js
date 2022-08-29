import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla/index.js';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class TextInput extends TemplateElement {
	uuid = Math.random().toString(36).substr(2, 5);

	properties() {
		return {
			id: `text-input-${this.uuid}`,
			name: '',
			type: 'text',
			error: '',
			label: '',
			value: '',
		};
	}

	template() {
		return html`
			<label class="form-label" for="${this.id}">${this.label}:</label>
			<input
				id="${this.id}"
				name="${this.name}"
				class="form-input ${this.error ? 'error' : ''}"
				type="${this.type}"
				value="${this.value}"
			/>
			${this.error ? html` <div class="form-error">${this.error}</div> ` : ''}
		`;
	}
}
