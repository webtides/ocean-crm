import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla';
import { Component } from '@webtides/luna-js';
import icon from '../../partials/icon';
import { i18n } from '../../util/i18n';

@Component({
	target: Component.TARGET_BOTH,
})
export default class OrganizationsWidget extends TemplateElement {
	properties() {
		return {
			totalCount: 0,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const OrganizationService = (await import('../../../services/OrganizationService.js')).default;
		const allOrganizations = await OrganizationService.getAll();
		const totalCount = allOrganizations.length;
		return { totalCount };
	}

	connected() {
		const source = new EventSource('/api/events');

		source.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);

			console.log('message', data);

			if (data && data.organization) {
				this.totalCount = data.organization.total;
			}
		});
	}

	template() {
		return html`
			<div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
				<dt>
					<div class="absolute bg-primary-500 rounded-md p-3">
						${icon.outline('users', 'h-6 w-6 text-white')}
					</div>
					<p class="ml-16 text-sm font-medium text-gray-500 truncate">
						${i18n('views.components.dashboard-widgets.organization-widget.organizations')}
					</p>
				</dt>
				<dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
					<p class="text-2xl font-semibold text-gray-900">${this.totalCount}</p>
					<p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
						${icon.solid('arrow-sm-up', 'self-center flex-shrink-0 h-5 w-5 text-green-500')}
						<span class="sr-only"> Increased by </span>
						12
					</p>
					<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
						<div class="text-sm">
							<a href="/organizations" class="font-medium text-primary-600 hover:text-primary-500">
								View all<span class="sr-only"> Organizations</span></a
							>
						</div>
					</div>
				</dd>
			</div>
		`;
	}
}
