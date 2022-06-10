import { html } from '@webtides/element-js/src/renderer/vanilla';

function icon(name, classes) {
	return html`<svg-icon base-path="assets/heroicons" name="${name}" class="${classes}"></svg-icon>`;
}

export default {
	outline: (name, classes) => icon(`outline/${name}`, classes),
	solid: (name, classes) => icon(`solid/${name}`, classes),
};
