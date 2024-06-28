import { html, TemplateElement } from '@webtides/element-js';
import { Component } from '@webtides/luna-js';
import icon from '../partials/icon.js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class ResourcePreviewDialog extends TemplateElement {
	properties() {
		return {
			title: 'Preview Resource',
			isOpen: false,
			fields: {},
			item: {},
		};
	}

	async loadDynamicProperties({ request, response }) {
		const flash = request.session.flash;
		request.session.flash = undefined;
		return { flash };
	}

	open(item) {
		this.item = item;
		this.isOpen = true;
	}

	template() {
		return html`
			<dialog ref="dialog" id="favDialog" ${this.isOpen ? 'open' : ''}>
				<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<!--
					  Background backdrop, show/hide based on modal state.

					  Entering: "ease-out duration-300"
						From: "opacity-0"
						To: "opacity-100"
					  Leaving: "ease-in duration-200"
						From: "opacity-100"
						To: "opacity-0"
					-->
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

					<div class="fixed z-10 inset-0 overflow-y-auto">
						<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
							<!--
							  Modal panel, show/hide based on modal state.

							  Entering: "ease-out duration-300"
								From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								To: "opacity-100 translate-y-0 sm:scale-100"
							  Leaving: "ease-in duration-200"
								From: "opacity-100 translate-y-0 sm:scale-100"
								To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							-->
							<div
								class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mx-16 sm:w-full sm:p-6"
							>
								<div>
									<div class="px-4 py-5 sm:px-6 flex gap-10 items-center justify-start">
										<div
											class="flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
										>
											${icon.outline('check', 'h-6 w-6 text-green-600')}
										</div>
										<div>
											<h3 class="text-lg leading-6 font-medium text-gray-900">${this.title}</h3>
											<p class="mt-1 max-w-2xl text-sm text-gray-500">
												Personal details and application.
											</p>
										</div>
									</div>
									<div class="border-t border-gray-200 px-4 py-5 sm:p-0 mt-4 sm:mt-6">
										<dl class="sm:divide-y sm:divide-gray-200">
											${Object.keys(this.fields).map(
												(field) => html`
													<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
														<dt class="text-sm font-medium text-gray-500">
															${this.fields[field]}
														</dt>
														<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
															${this.item[field]}
														</dd>
													</div>
												`,
											)}
											<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt class="text-sm font-medium text-gray-500">Logs</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
													<ul
														role="list"
														class="border border-gray-200 rounded-md divide-y divide-gray-200"
													>
														<li
															class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
														>
															<div class="w-0 flex-1 flex items-center">
																${icon.solid(
																	'paper-clip',
																	'flex-shrink-0 h-5 w-5 text-gray-400',
																)}
																<span class="ml-2 flex-1 w-0 truncate">
																	resume_back_end_developer.pdf
																</span>
															</div>
															<div class="ml-4 flex-shrink-0">
																<a
																	href="#"
																	class="font-medium text-primary-600 hover:text-primary-500"
																>
																	Download
																</a>
															</div>
														</li>
														<li
															class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
														>
															<div class="w-0 flex-1 flex items-center">
																${icon.solid(
																	'paper-clip',
																	'flex-shrink-0 h-5 w-5 text-gray-400',
																)}
																<span class="ml-2 flex-1 w-0 truncate">
																	coverletter_back_end_developer.pdf
																</span>
															</div>
															<div class="ml-4 flex-shrink-0">
																<a
																	href="#"
																	class="font-medium text-primary-600 hover:text-primary-500"
																>
																	Download
																</a>
															</div>
														</li>
													</ul>
												</dd>
											</div>
										</dl>
									</div>
								</div>
								<form method="dialog" class="mt-5 sm:mt-6 flex gap-4 items-center justify-end">
									<button
										value="cancel"
										class="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
									>
										Cancel
									</button>
									<a
										href="/${this.resource}s/${this.item.id}/edit"
										class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
									>
										Edit
									</a>
								</form>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		`;
	}
}
