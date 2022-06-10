import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ResourceOverviewTable extends TemplateElement {
	properties() {
		return {
			resource: '',
			pagination: undefined,
			items: [],
			fields: {},
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const trashed = request.query.trashed;
		const page = parseInt(request.query.page || 1);
		return { request, response, search, page, trashed };
	}

	template() {
		return html`
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr>
								${Object.keys(this.fields).map(
									(field) => html`
										<th
											scope="col"
											class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
										>
											${this.fields[field]}
										</th>
									`,
								)}
								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span class="sr-only">Preview</span>
								</th>
								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white">
							${this.items?.map(
								(item) => html`
									<tr class="odd:bg-white even:bg-slate-50">
										${Object.keys(this.fields).map(
											(field) => html`
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
												>
													${item[field]}
												</td>
											`,
										)}
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
										>
											<resource-preview-link api-link="/api/json/${this.resource}s?id=${item.id}">
												<a
													href="/${this.resource}s/${item.id}/edit"
													class="text-indigo-600 hover:text-indigo-900"
													>Preview<span class="sr-only">, ${item.name}</span></a
												>
											</resource-preview-link>
										</td>
										<td
											class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
										>
											<a
												href="/${this.resource}s/${item.id}/edit"
												class="text-indigo-600 hover:text-indigo-900"
												>Edit<span class="sr-only">, ${item.name}</span></a
											>
										</td>
									</tr>
								`,
							)}
						</tbody>
					</table>
					${this.items?.length === 0
						? html`
								<div
									class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
								>
									No items found.
								</div>
						  `
						: html`
								<pagination-component
									pagination="${JSON.stringify(this.pagination)}"
								></pagination-component>
						  `}
				</div>
			</div>
			<resource-preview-dialog
				resource="organization"
				title="Preview Contact"
				fields='${JSON.stringify(this.fields)}'
			></resource-preview-dialog>
		`;
	}
}
