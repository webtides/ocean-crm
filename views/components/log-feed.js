import { html, TemplateElement } from '@webtides/element-js';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class LogFeed extends TemplateElement {
	properties() {
		return {
			logs: [],
		};
	}

	template() {
		return html`
			<div class="flex flex-col">
				<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-300">
								<thead class="bg-gray-50">
									<tr>
										<th
											scope="col"
											class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
										>
											Activity
										</th>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Resource
										</th>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Type
										</th>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Date
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white">
									${this.logs?.map(
										(log) => html`
											<tr>
												<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
													${this.activityTemplate(
														log.resourceType,
														log.logType,
														log.user.name,
													)}
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													${this.resourceTemplate(
														log.resourceType,
														log.resourceName,
														log.resourceId,
													)}
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													${this.typeTemplate(log.logType)}
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													${this.formattedDateTemplate(log.createdAt)}
												</td>
											</tr>
										`,
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	activityTemplate(resourceType, activityType, userName) {
		let text = '';
		let icon = '';

		if (resourceType === 'contact') {
			icon = html`
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			`;
		}
		if (resourceType === 'organization') {
			icon = html`<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>`;
		}
		if (resourceType === 'user') {
			icon = html`<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>`;
		}

		if (activityType === 'create') {
			text = `has created a new ${resourceType}`;
		}
		if (activityType === 'update') {
			text = `updated the ${resourceType}`;
		}
		if (activityType === 'delete') {
			text = `has deleted the ${resourceType}`;
		}
		if (activityType === 'restore') {
			text = `restored the ${resourceType}`;
		}

		return html` <div class="flex items-center">
			<div class="h-6 w-6 flex-shrink-0">${icon}</div>
			<div class="ml-4">
				<div class="font-medium text-gray-900">${userName}</div>
				<div class="text-gray-500">${text}</div>
			</div>
		</div>`;
	}

	resourceTemplate(type, name = 'name', id) {
		if (type === 'contact') {
			return html`
				<a href="/contacts/${id}/edit" class="font-medium text-primary-600 hover:text-primary-500">${name}</a>
			`;
		}
		if (type === 'organization') {
			return html`
				<a href="/organizations/${id}/edit" class="font-medium text-primary-600 hover:text-primary-500"
					>${name}</a
				>
			`;
		}
		if (type === 'user') {
			return html`
				<a href="/users/${id}/edit" class="font-medium text-primary-600 hover:text-primary-500">${name}</a>
			`;
		}
	}

	typeTemplate(type) {
		if (type === 'create') {
			return html`
				<span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
					>Created</span
				>
			`;
		}
		if (type === 'update') {
			return html`
				<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800"
					>Updated</span
				>
			`;
		}
		if (type === 'delete') {
			return html`
				<span class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
					>Deleted</span
				>
			`;
		}
		if (type === 'restore') {
			return html`
				<span
					class="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800"
					>Restored</span
				>
			`;
		}
	}

	formattedDateTemplate(timestamp) {
		const date = new Date(timestamp);
		return `${date.getDay()}.${
			date.getMonth() + 1
		}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
	}
}
