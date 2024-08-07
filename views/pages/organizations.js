import { html } from '@webtides/element-js';
import OrganizationService from '../../app/services/OrganizationService.js';
import isAuthenticated from '../util/isAuthenticated.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Organizations',
			search: '',
			page: 0,
			trashed: '',
			pagination: undefined,
			organizations: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const trashed = request.query.trashed;
		const page = parseInt(request.query.page || 1);
		const { pagination, organizations } = await OrganizationService.getFilteredOrganizations(search, page, trashed);
		return { request, response, search, page, trashed, pagination, organizations };
	}

	template() {
		const overviewFields = {
			name: 'Name',
			phone: 'Phone',
			city: 'City',
		};

		const previewFields = {
			name: 'Name',
			email: 'Email',
			phone: 'Phone',
			address: 'Address',
			postalCode: 'Postal Code',
			city: 'City',
			region: 'Region',
			country: 'Country',
		};

		return html`
			<div class="">
				<div class="sm:flex sm:items-center">
					<div class="sm:flex-auto">
						<search-filter class="block w-full max-w-md"></search-filter>
					</div>
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<a
							href="/organizations/create"
							class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
							>Add organization</a
						>
					</div>
				</div>
				<div class="mt-8 flex flex-col">
					<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<resource-overview-table
							resource="organization"
							pagination="${JSON.stringify(this.pagination)}"
							items="${JSON.stringify(this.organizations)}"
							overview-fields='${JSON.stringify(overviewFields)}'
							preview-fields='${JSON.stringify(previewFields)}'
						></resource-overview-table>
					</div>
				</div>
			</div>
		`;
	}
}
