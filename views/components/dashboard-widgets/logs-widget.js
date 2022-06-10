import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component, MethodContext } from '@webtides/luna-js';
import icon from "../../partials/icon";

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
						${icon.outline('collection', 'h-6 w-6 text-white')}
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
