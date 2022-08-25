import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component, MethodContext, Inject } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ContactsPage extends TemplateElement {
	@Inject('ContactService') contactService;

	properties() {
		return {
			search: '',
			page: 1,
			trashed: '',
			pagination: undefined,
			contacts: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const trashed = request.query.trashed;
		const page = parseInt(request.query.page || 1);
		const { pagination, contacts } = await this.contactService.getFilteredContacts(search, page, trashed);
		return { request, response, search, trashed, page, pagination, contacts };
	}

	@MethodContext({ target: 'server', syncProperties: ['search', 'page', 'trashed'] })
	async getFilteredContacts() {
		const { pagination, contacts } = await this.contactService.getFilteredContacts(this.search, this.page, this.trashed);
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
			trashed: async (trashed) => {
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
					this.trashed = e.target.elements.trashed.value;
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
			trashed: this.trashed || undefined,
		};

		const queryParameters = [`page=${this.page}`];

		if (this.search) {
			queryParameters.push(`search=${this.search}`);
		}

		if (this.trashed) {
			queryParameters.push(`trashed=${this.trashed}`);
		}

		const query = queryParameters.join('&');

		history.replaceState(parameters, '', query ? `?${query}` : location.pathname);
	}

	template() {
		const fields = {
			name: 'Name',
			organization: 'Organization',
			city: 'City',
		};

		const overviewFields = {
			name: 'Name',
			organization: 'Organization',
			city: 'City',
		};

		const previewFields = {
			name: 'Name',
			email: 'Email',
			phone: 'Phone',
			city: 'City',
			organization: 'Organization',
		};

		const contacts = this.contacts.map((contact) => {
			return {
				...contact,
				organization: contact.organization.name,
			};
		});

		return html`
			<div class="">
				<div class="sm:flex sm:items-center">
					<div class="sm:flex-auto">
						<search-filter class="block w-full max-w-md"></search-filter>
					</div>
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<a
							href="/contacts/create"
							class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
							>Add contact</a
						>
					</div>
				</div>
				<div class="mt-8 flex flex-col">
					<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<resource-overview-table
							resource="contact"
							pagination="${JSON.stringify(this.pagination)}"
							items="${JSON.stringify(contacts)}"
							overviewfields="${JSON.stringify(overviewFields)}"
							previewfields="${JSON.stringify(previewFields)}"
						></resource-overview-table>
					</div>
				</div>
			</div>
		`;
	}
}
