import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla/index.js';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class FlashMessage extends TemplateElement {
	properties() {
		return {
			flash: undefined,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const flash = request.session.flash;
		request.session.flash = undefined;
		return { flash };
	}

	template() {
		return html`
			${this.flash && this.flash.success
				? html`
						<div class="flex items-center justify-between mb-8 max-w-3xl bg-green-500 rounded">
							<div class="flex items-center">
								<svg
									class="flex-shrink-0 ml-4 mr-2 w-4 h-4 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
								</svg>
								<div class="py-4 text-white text-sm font-medium">${this.flash.success}</div>
							</div>
							<button type="button" class="group mr-2 p-2" @click="show = false">
								<svg
									class="block w-2 h-2 fill-green-800 group-hover:fill-white"
									xmlns="http://www.w3.org/2000/svg"
									width="235.908"
									height="235.908"
									viewBox="278.046 126.846 235.908 235.908"
								>
									<path
										d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396 210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38 244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396 279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62 244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z"
									/>
								</svg>
							</button>
						</div>
				  `
				: ''}
			${this.flash && this.flash.error
				? html`
						<div class="flex items-center justify-between mb-8 max-w-3xl bg-red-500 rounded">
							<div class="flex items-center">
								<svg
									class="flex-shrink-0 ml-4 mr-2 w-4 h-4 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
									/>
								</svg>
								<div class="py-4 text-white text-sm font-medium">${this.flash.error}</div>
							</div>
							<button type="button" class="group mr-2 p-2" @click="show = false">
								<svg
									class="block w-2 h-2 fill-red-800 group-hover:fill-white"
									xmlns="http://www.w3.org/2000/svg"
									width="235.908"
									height="235.908"
									viewBox="278.046 126.846 235.908 235.908"
								>
									<path
										d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396 210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38 244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396 279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62 244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z"
									/>
								</svg>
							</button>
						</div>
				  `
				: ''}
		`;
	}
}
