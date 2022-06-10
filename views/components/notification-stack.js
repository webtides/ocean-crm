import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';
import style from './notification-stack.css';

@Component({
	target: Component.TARGET_BOTH,
})
export default class NotificationStack extends TemplateElement {
	constructor() {
		super({ styles: [style] });
	}

	properties() {
		return {
			notifications: [
				// {
				// 	title: 'Successfully saved!',
				// 	text: 'Anyone with a link can now view this file.',
				// }
			],
		};
	}

	events() {
		return {
			document: {
				'show-notification': ({ detail }) => {},
			},
		};
	}

	template() {
		return html`
			<!-- Global notification live region, render this permanently at the end of the document -->
			<div
				aria-live="assertive"
				class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
			>
				<div ref="stack" class="w-full flex flex-col items-center space-y-4 sm:items-end">
					<!--
					  Notification panel, dynamically insert this into the live region when it needs to be displayed

					  Entering: "transform ease-out duration-300 transition"
						From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						To: "translate-y-0 opacity-100 sm:translate-x-0"
					  Leaving: "transition ease-in duration-100"
						From: "opacity-100"
						To: "opacity-0"
					-->
					${this.notifications.map(notification => html`
						<notification-toast
							title="${notification.title}"
							text="${notification.text}"
							class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
						></notification-toast>
					`)}
				</div>
			</div>
		`;
	}
}
