import { html } from '@webtides/element-js/src/renderer/vanilla';
import OrganizationService from '../../../../services/OrganizationService';
import isAuthenticated from '../../../util/isAuthenticated';
import AuthorizationService from '../../../../services/AuthorizationService';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Create Organisation',
			errors: undefined,
			oldValues: undefined,
			organization: undefined,
			can: undefined,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const organizationId = parseInt(request.params.id);
		const organization = await OrganizationService.findById(organizationId);

		const errors = request.session?.errors;
		const oldValues = request.session?.oldValues;

		const can = {
			deleteOrganization: await AuthorizationService.can(request.user, 'delete', 'organization', organizationId),
		};

		return { request, response, organizationId, errors, oldValues, organization, can };
	}

	template() {
		return html`
			<div>
				${this.can?.deleteOrganization
					? html`
							${this.organization?.deletedAt
								? html`
										<form
											method="post"
											action="/api/organisation"
											class="p-4 bg-yellow-300 rounded flex items-center justify-between max-w-3xl mb-6"
										>
											<input type="hidden" name="_method" value="delete" />
											<input type="hidden" name="organizationId" value="${this.organizationId}" />
											<input type="hidden" name="restore" value="true" />
											<div class="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													class="flex-shrink-0 w-4 h-4 fill-yellow-800 mr-2"
												>
													<path
														d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
													></path>
												</svg>
												<div class="text-sm font-medium text-yellow-800">
													This organization has been deleted.
												</div>
											</div>
											<button type="submit" class="text-sm text-yellow-800 hover:underline">
												Restore
											</button>
										</form>
								  `
								: html`
										<form
											method="post"
											action="/api/organisation"
											class="py-4 flex justify-end max-w-3xl"
										>
											<input type="hidden" name="_method" value="delete" />
											<input type="hidden" name="organizationId" value="${this.organizationId}" />
											<input type="hidden" name="restore" value="false" />
											<button type="submit" class="text-red-600 hover:underline">
												Delete Organization
											</button>
										</form>
								  `}
					  `
					: ''}
				<div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
					<form method="post" action="/api/organisation">
						<input type="hidden" name="_method" value="put" />
						<input type="hidden" name="organizationId" value="${this.organizationId}" />
						<div class="flex flex-wrap -mb-8 -mr-6 p-8">
							<text-input
								name="name"
								value="${this.oldValues?.name || this.organization?.name}"
								error="${this.errors?.name}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Name"
							></text-input>
							<text-input
								name="email"
								value="${this.oldValues?.email || this.organization?.email}"
								error="${this.errors?.email}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Email"
							></text-input>
							<text-input
								name="phone"
								value="${this.oldValues?.phone || this.organization?.phone}"
								error="${this.errors?.phone}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Phone"
							></text-input>
							<text-input
								name="address"
								value="${this.oldValues?.address || this.organization?.address}"
								error="${this.errors?.address}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Address"
							></text-input>
							<text-input
								name="city"
								value="${this.oldValues?.city || this.organization?.city}"
								error="${this.errors?.city}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="City"
							></text-input>
							<text-input
								name="region"
								value="${this.oldValues?.region || this.organization?.region}"
								error="${this.errors?.region}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Province/State"
							></text-input>
							<select-input
								name="country"
								value="${this.oldValues?.country || this.organization?.country}"
								error="${this.errors?.country}"
								options='[{"value": "CA", "label": "Canada"}, {"value": "US", "label": "United States"}]'
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Country"
							></select-input>
							<text-input
								name="postalCode"
								value="${this.oldValues?.postalCode || this.organization?.postcalCode}"
								error="${this.errors?.postalCode}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Postal code"
							></text-input>
						</div>
						<div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
							<button class="btn-primary" type="submit">Update Organization</button>
						</div>
					</form>
				</div>
				<h2 class="mt-12 font-bold text-2xl">Contacts</h2>
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
										${this.organization.contacts?.map(
											(contact) => html`
												<tr class="odd:bg-white even:bg-slate-50">
													<td
														class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
													>
														${contact.name}
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
															class="text-primary-600 hover:text-primary-900"
															>Edit<span class="sr-only">, ${contact.name}</span></a
														>
													</td>
												</tr>
											`,
										)}
									</tbody>
								</table>
								${this.organization?.contacts?.length === 0
									? html`
											<div
												class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
											>
												No contacts found.
											</div>
									  `
									: ''}
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
