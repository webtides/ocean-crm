import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component, MethodContext } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ContactsEditPage extends TemplateElement {
	properties() {
		return {
			title: 'Edit Contact',
			errors: undefined,
			oldValues: undefined,
			contact: undefined,
			organizations: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const ContactService = (await import('../../../services/ContactService.js')).default;
		const OrganizationService = (await import('../../../services/OrganizationService.js')).default;

		const contactId = parseInt(request.params.id);
		const contact = ContactService.find(contactId);

		const errors = request.session?.errors;
		const oldValues = request.session?.oldValues;

		const organizations = OrganizationService.getAllOrganisations();

		return { request, response, contactId, errors, oldValues, contact, organizations };
	}

	@MethodContext({ target: 'server', syncProperties: ['contactId'] })
	async deleteContact(restore = false) {
		const ContactService = (await import('../../../services/ContactService.js')).default;

		if (restore) {
			ContactService.restore(this.contactId);
		} else {
			ContactService.delete(this.contactId);
		}

		const contact = ContactService.find(this.contactId);

		return { contact };
	}

	@MethodContext({ target: 'server', syncProperties: ['contactId'] })
	async updateContact(values) {
		const ContactService = (await import('../../../services/ContactService.js')).default;

		ContactService.update(this.contactId, values);

		const contact = ContactService.find(this.contactId);

		return { contact };
	}

	events() {
		return {
			'this': {
				submit: async (e) => {
					e.preventDefault();

					if (e.target.elements['_method'].value === 'delete') {
						const contactId = e.target.elements['contactId'].value;
						const restore = e.target.elements['restore'].value === 'true';
						this.contactId = parseInt(contactId);
						const { contact } = await this.deleteContact(restore);
						this.contact = contact;
					}

					if (e.target.elements['_method'].value === 'put') {
						const contactId = e.target.elements['contactId'].value;
						this.contactId = parseInt(contactId);

						// TODO: server side validation is missing here...
						const formData = new FormData(e.target);
						const values = {
							name: formData.get('name'),
							organization: formData.get('organization'),
							email: formData.get('email'),
							phone: formData.get('phone'),
						};

						const { contact } = await this.updateContact(values);
						this.contact = contact;
					}
				},
			},
		};
	}

	template() {
		const organizationOptions = this.organizations.map(organization => ({ value: organization.id, label: organization.name}));
		return html`
			<div>
				${this.contact?.deleted_at ? html`
					<form method="post" action="/api/contact" class="p-4 bg-yellow-300 rounded flex items-center justify-between max-w-3xl mb-6">
						<input type="hidden" name="_method" value="delete">
						<input type="hidden" name="contactId" value="${this.contactId}">
						<input type="hidden" name="restore" value="true">
						<div class="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="flex-shrink-0 w-4 h-4 fill-yellow-800 mr-2"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"></path></svg>
							<div class="text-sm font-medium text-yellow-800">
								This contact has been deleted.
							</div>
						</div>
						<button type="submit" class="text-sm text-yellow-800 hover:underline">Restore</button>
					</form>
				`: html`
					<form method="post" action="/api/contact" class="py-4 flex justify-end max-w-3xl">
						<input type="hidden" name="_method" value="delete">
						<input type="hidden" name="contactId" value="${this.contactId}">
						<input type="hidden" name="restore" value="false">
						<button type="submit" class="text-red-600 hover:underline">Delete Contact</button>
					</form>
				`}
				<div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
					<form method="post" action="/api/contact">
						<input type="hidden" name="_method" value="put">
						<input type="hidden" name="contactId" value="${this.contactId}">
						<div class="flex flex-wrap -mb-8 -mr-6 p-8">
							<text-input name="name" value="${this.oldValues?.name || this.contact?.name}" error="${this.errors?.name}" class="pb-8 pr-6 w-full lg:w-1/2" label="Name"></text-input>
							<text-input name="phone" value="${this.oldValues?.phone || this.contact?.phone}" error="${this.errors?.phone}" class="pb-8 pr-6 w-full lg:w-1/2" label="Phone"></text-input>
							<text-input name="city" value="${this.oldValues?.city || this.contact?.city}" error="${this.errors?.city}" class="pb-8 pr-6 w-full lg:w-1/2" label="City"></text-input>
							<select-input name="organization" value="${this.oldValues?.organization || this.contact?.organization}" error="${this.errors?.organization?.join(',')}" options='${JSON.stringify(organizationOptions)}' class="pb-8 pr-6 w-full lg:w-1/2" label="Organization"></select-input>
						</div>
						<div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
							<button class="btn-indigo" type="submit">Update Contact</button>
						</div>
					</form>
				</div>
			</div>
		`;
	}
}
