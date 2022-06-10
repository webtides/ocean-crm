import { html, unsafeHTML, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';

import style from './svg-icon.css';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class SvgIcon extends TemplateElement {
	constructor() {
		super({ styles: [style] });
	}

	properties() {
		return {
			baseUrl: '',
			basePath: 'assets/icons',
			name: '',
			lazy: true,
			svgContent: null,
		};
	}

	connected() {
		// TODO: use intersection observer for lazy loading
		this.fetchIcon();
	}

	fetchIcon() {
		// TODO: think about cache busting the url
		// maybe add timestamp? or commit hash from window['commitHash'] or something ?
		fetch(`${this.baseUrl}/${this.basePath}/${this.name}.svg`)
			.then((r) => r.text())
			.then((text) => {
				this.svgContent = text;
				// this.requestUpdate();
			})
			.catch((error) => console.log({ error }));
	}

	template() {
		return this.svgContent ? html`${unsafeHTML(this.svgContent)}` : html``;
	}
}
