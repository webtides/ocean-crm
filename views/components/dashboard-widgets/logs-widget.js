import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component, MethodContext } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class LogsWidget extends TemplateElement {
	properties() {
		return {
			logs: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const LogService = (await import('../../../services/LogService.js')).default;
		const user = request.user;
		const { logs } = await LogService.getFilteredLogs(user, 1, '');
		return { user, logs };
	}

	@MethodContext({ target: 'server', syncProperties: ['user'] })
	async getLatestLogs() {
		const LogService = (await import('../../../services/LogService.js')).default;
		const { logs } = await LogService.getFilteredLogs(this.user, 1, '');
		return { logs };
	}

	connected() {
		const source = new EventSource('/api/events');

		source.addEventListener('message', async (event) => {
			const data = JSON.parse(event.data);

			if (data && data.logs) {
				const { logs } = await this.getLatestLogs();
				this.logs = logs;
			}
		});
	}

	template() {
		return html`
			<div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
				<dt>
					<div class="absolute bg-indigo-500 rounded-md p-3">
						<!-- Heroicon name: outline/collection -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<p class="ml-16 text-sm font-medium text-gray-500 truncate">Logs Feed</p>
				</dt>
				<dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
					<div>Latest 5</div>
				</dd>
				<log-feed logs="${JSON.stringify(this.logs?.slice(0, 5))}"></log-feed>
				<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
					<div class="text-sm">
						<a href="/logs" class="font-medium text-indigo-600 hover:text-indigo-500">
							View all<span class="sr-only"> Logs</span></a
						>
					</div>
				</div>
			</div>
		`;
	}
}
