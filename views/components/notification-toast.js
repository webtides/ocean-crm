import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';
import icon from "../partials/icon";

@Component({
	target: Component.TARGET_BOTH,
})
export default class NotificationToast extends TemplateElement {
	properties() {
		return {
			title: '',
			text: '',
			variant: 'success', // success || warning || danger
		};
	}

	template() {
		return html`
			<div class="p-4">
				<div class="flex items-start">
					<div class="flex-shrink-0">
						${icon.outline('check-circle', 'h-6 w-6 text-green-400')}
					</div>
					<div class="ml-3 w-0 flex-1 pt-0.5">
						<p class="text-sm font-medium text-gray-900">${this.title}</p>
						<p class="mt-1 text-sm text-gray-500">${this.text}</p>
					</div>
					<div class="ml-4 flex-shrink-0 flex">
						<button
							type="button"
							class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
						>
							<span class="sr-only">Close</span>
							${icon.solid('x', 'h-5 w-5')}
						</button>
					</div>
				</div>
			</div>
		`;
	}
}
