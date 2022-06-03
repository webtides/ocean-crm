import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ContactsWidget extends TemplateElement {
	properties() {
		return {
			totalCount: 0,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const ContactService = (await import('../../../services/ContactService.js')).default;
		const totalCount = ContactService.getCollection().count();
		return { totalCount };
	}

	connected() {
		const source = new EventSource('/api/events');

		source.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);

			if (data && data.contacts) {
				this.totalCount = data.contacts.total;
			}
		});
	}

	template() {
		return html`
			<div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
				<dt>
					<div class="absolute bg-indigo-500 rounded-md p-3">
						<!-- Heroicon name: outline/mail-open -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
							/>
						</svg>
					</div>
					<p class="ml-16 text-sm font-medium text-gray-500 truncate">Contacts</p>
				</dt>
				<dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
					<p class="text-2xl font-semibold text-gray-900">${this.totalCount}</p>
					<p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
						<!-- Heroicon name: solid/arrow-sm-up -->
						<svg
							class="self-center flex-shrink-0 h-5 w-5 text-green-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="sr-only"> Increased by </span>
						5.4%
					</p>
					<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
						<div class="text-sm">
							<a href="/contacts" class="font-medium text-indigo-600 hover:text-indigo-500">
								View all<span class="sr-only"> Contacts</span></a
							>
						</div>
					</div>
				</dd>
			</div>
		`;
	}
}
