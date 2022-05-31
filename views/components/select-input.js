import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class SelectInput extends TemplateElement {
	uuid = Math.random().toString(36).substr(2, 5);

	properties() {
		return {
			id: `text-input-${this.uuid}`,
			name: '',
			label: '',
			error: '',
			value: undefined,
			options: [], // ['string1', 'string2'] or [{value: 'value', label: 'label'}, ...]
		};
	}

	template() {
		return html`
			<label class="form-label" for="${this.id}">${this.label}:</label>
			<select id="${this.id}" name="${this.name}" class="form-input ${this.error ? 'error' : ''}">
				<option value="">Please choose an option</option>
				${this.options.map(
					(option) => html`
						<option
							value="${option.value || option || ''}"
							${(option.value && option.value === this.value) || option === this.value ? 'selected' : ''}
						>
							${option.label ?? option}
						</option>
					`,
				)}
			</select>
			${this.error ? html` <div class="form-error">${this.error}</div> ` : ''}
		`;
	}
}
