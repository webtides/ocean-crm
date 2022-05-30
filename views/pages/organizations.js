import { html } from '@webtides/element-js/src/renderer/vanilla';
import OrganizationService from "../../services/OrganizationService";

export default class {
	properties() {
		return {
			title: 'Organisations',
			search: '',
			page: 0,
			pagination: undefined,
			organizations: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const page = parseInt(request.query.page || 1);
		const { pagination, organizations } = OrganizationService.getFilteredOrganisations(search, page);
		return { request, response, search, page, pagination, organizations };
	}

	template() {
		return html`
			<div class="">
				<div class="sm:flex sm:items-center">
					<div class="sm:flex-auto">
						<search-filter v-model="form.search" class="block w-full max-w-md" @reset="reset"></search-filter>
					</div>
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<a href="/organizations/create" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add organisation</a>
					</div>
				</div>
				<div class="mt-8 flex flex-col">
					<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table class="min-w-full divide-y divide-gray-300">
									<thead class="bg-gray-50">
									<tr>
										<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
										<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
										<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
										<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
									</thead>
									<tbody class="bg-white">
									${this.organizations.map(organisation => html`
										<tr class="odd:bg-white even:bg-slate-50">
											<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${organisation.name}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${organisation.phone}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${organisation.city}</td>
											<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<a href="/organizations/${organisation.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, ${organisation.name}</span></a>
											</td>
										</tr>
									`)}
									</tbody>
								</table>
								<pagination-component pagination='${JSON.stringify(this.pagination)}'></pagination-component>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
