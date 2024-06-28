import { html } from '@webtides/element-js';
import isAuthenticated from '../../util/isAuthenticated.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Create Organization',
			errors: undefined,
			oldValues: undefined,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const errors = request.session?.errors;
		const oldValues = request.session?.oldValues;

		return { request, response, errors, oldValues };
	}

	template() {
		return html`
			<div>
				<div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
					<form method="post" action="/api/organization">
						<div class="flex flex-wrap -mb-8 -mr-6 p-8">
							<text-input
								name="name"
								error="${this.errors?.name?.join(',')}"
								value="${this.oldValues?.name}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Name"
							></text-input>
							<text-input
								name="email"
								error="${this.errors?.email?.join(',')}"
								value="${this.oldValues?.email}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Email"
							></text-input>
							<text-input
								name="phone"
								error="${this.errors?.phone?.join(',')}"
								value="${this.oldValues?.phone}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Phone"
							></text-input>
							<text-input
								name="address"
								error="${this.errors?.address?.join(',')}"
								value="${this.oldValues?.address}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Address"
							></text-input>
							<text-input
								name="city"
								error="${this.errors?.city?.join(',')}"
								value="${this.oldValues?.city}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="City"
							></text-input>
							<text-input
								name="region"
								error="${this.errors?.region?.join(',')}"
								value="${this.oldValues?.region}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Province/State"
							></text-input>
							<select-input
								name="country"
								error="${this.errors?.country?.join(',')}"
								value="${this.oldValues?.country}"
								options='[{"value": "CA", "label": "Canada"}, {"value": "US", "label": "United States"}]'
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Country"
							></select-input>
							<text-input
								name="postalCode"
								error="${this.errors?.postalCode?.join(',')}"
								value="${this.oldValues?.postalCode}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Postal code"
							></text-input>
						</div>
						<div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
							<button class="btn-primary" type="submit">Create Organization</button>
						</div>
					</form>
				</div>
			</div>
		`;
	}
}
