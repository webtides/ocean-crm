import { html } from '@webtides/element-js/src/renderer/vanilla';
import OrganizationService from '../../../services/OrganizationService';
import isAuthenticated from "../../util/isAuthenticated";

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Create Contact',
			errors: undefined,
			oldValues: undefined,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const errors = request.session?.errors;
		const oldValues = request.session?.oldValues;

		const organizations = await OrganizationService.getAll();

		return { request, response, errors, oldValues, organizations };
	}

	template() {
		const organizationOptions = this.organizations.map((organization) => ({
			value: organization.id,
			label: organization.name,
		}));
		return html`
			<div>
				<div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
					<form method="post" action="/api/contact">
						<div class="flex flex-wrap -mb-8 -mr-6 p-8">
							<text-input
								name="name"
								error="${this.errors?.name?.join(',')}"
								value="${this.oldValues?.name}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Name"
							></text-input>
							<text-input
								name="phone"
								error="${this.errors?.phone?.join(',')}"
								value="${this.oldValues?.phone}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Phone"
							></text-input>
							<text-input
								name="city"
								error="${this.errors?.city?.join(',')}"
								value="${this.oldValues?.city}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="City"
							></text-input>
							<select-input
								name="organization"
								error="${this.errors?.organization?.join(',')}"
								value="${this.oldValues?.organization}"
								options="${JSON.stringify(organizationOptions)}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Organization"
							></select-input>
						</div>
						<div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
							<button class="btn-indigo" type="submit">Create Contact</button>
						</div>
					</form>
				</div>
			</div>
		`;
	}
}
