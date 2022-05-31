import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component, MethodContext } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ContactsPage extends TemplateElement {
	properties() {
		return {
			search: '',
			page: 1,
			pagination: undefined,
			contacts: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const page = parseInt(request.query.page || 1);
		const ContactService = (await import('../../../services/ContactService.js')).default;
		const { pagination, contacts } = ContactService.getFilteredContacts(search, page);
		return { request, response, search, page, pagination, contacts };
	}

	@MethodContext({ target: 'server', syncProperties: ['search', 'page'] })
	async getFilteredContacts() {
		const ContactService = (await import('../../../services/ContactService.js')).default;
		const { pagination, contacts } = ContactService.getFilteredContacts(this.search, this.page);
		return { pagination, contacts };
	}

	watch() {
		return {
			search: async (search) => {
				this.page = 1;
				const { pagination, contacts } = await this.getFilteredContacts();
				this.pagination = pagination;
				this.contacts = contacts;
				await this.updateUrl();
			},
			page: async (page) => {
				const { pagination, contacts } = await this.getFilteredContacts();
				this.pagination = pagination;
				this.contacts = contacts;
				await this.updateUrl();
			},
		};
	}

	events() {
		return {
			'search-filter': {
				submit: (e) => {
					e.preventDefault();
					this.search = e.target.elements.search.value;
				},
			},
			'pagination-component a': {
				click: (e) => {
					e.preventDefault();
					this.page = parseInt(e.target.dataset.page);
				},
			},
		};
	}

	async updateUrl() {
		const parameters = {
			search: this.search || undefined,
			page: this.page,
		};

		const queryParameters = [`page=${this.page}`];

		if (this.search) {
			queryParameters.push(`search=${this.search}`);
		}

		const query = queryParameters.join('&');

		history.replaceState(parameters, '', query ? `?${query}` : location.pathname);
	}

	template() {
		return html`
			<div class="">
				<div class="sm:flex sm:items-center">
					<div class="sm:flex-auto">
						<search-filter class="block w-full max-w-md"></search-filter>
					</div>
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<a
							href="/contacts/create"
							class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
							>Add contact</a
						>
					</div>
				</div>
				<div class="mt-8 flex flex-col">
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
												Name
											</th>
											<th
												scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Organization
											</th>
											<th
												scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Phone
											</th>
											<th
												scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												City
											</th>
											<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
												<span class="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody class="bg-white">
										${this.contacts.map(
											(contact) => html`
												<tr class="odd:bg-white even:bg-slate-50">
													<td
														class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
													>
														${contact.name}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														${contact.organization}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														${contact.phone}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														${contact.city}
													</td>
													<td
														class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
													>
														<a
															href="/contacts/${contact.id}/edit"
															class="text-indigo-600 hover:text-indigo-900"
															>Edit<span class="sr-only">, ${contact.name}</span></a
														>
													</td>
												</tr>
											`,
										)}
									</tbody>
								</table>
								${this.contacts?.length === 0
									? html`
											<div
												class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
											>
												No contacts found.
											</div>
									  `
									: html`
											<pagination-component
												pagination="${JSON.stringify(this.pagination)}"
											></pagination-component>
									  `}
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
