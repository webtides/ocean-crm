import { html } from '@webtides/element-js';
import isAuthenticated from '../util/isAuthenticated.js';
import icon from '../partials/icon.js';
import { i18n } from '../util/i18n.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	async loadDynamicProperties({ request, response }) {
		return { request, response };
	}

	template() {
		return html`
			<div>
				Hey there! Welcome to Ocean CRM, a demo app designed to help demonstrate how luna-js and element-js
				work.
			</div>
			<div class="mt-10">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Statistics for the last 30 days</h3>

				<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<organizations-widget></organizations-widget>
					<contacts-widget></contacts-widget>

					<div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
						<dt>
							<div class="absolute bg-primary-500 rounded-md p-3">
								${icon.outline('cursor-click', 'h-6 w-6 text-white')}
							</div>
							<p class="ml-16 text-sm font-medium text-gray-500 truncate">
								${i18n('views.pages.index.avgClickRate')}
							</p>
						</dt>
						<dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
							<p class="text-2xl font-semibold text-gray-900">24.57%</p>
							<p class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
								${icon.solid('arrow-sm-down', 'self-center flex-shrink-0 h-5 w-5 text-red-500')}
								<span class="sr-only"> Decreased by </span>
								3.2%
							</p>
							<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
								<div class="text-sm">
									<a href="#" class="font-medium text-primary-600 hover:text-primary-500">
										View all<span class="sr-only"> Avg. Click Rate stats</span></a
									>
								</div>
							</div>
						</dd>
					</div>

					<logs-widget class="col-span-1 sm:col-span-2 lg:col-span-3"></logs-widget>
				</dl>
			</div>
		`;
	}
}
