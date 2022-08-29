import { html, TemplateElement } from '@webtides/element-js/src/renderer/vanilla/index.js';
import { Component } from '@webtides/luna-js';
import icon from '../partials/icon.js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class PaginationComponent extends TemplateElement {
	properties() {
		return {
			pagination: undefined,
		};
	}

	template() {
		const pageLinkActiveClasses = 'z-10 bg-primary-50 border-primary-500 text-primary-600';
		const pageLinkDefaultClasses = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';

		return html`
			<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
				<div class="flex-1 flex justify-between sm:hidden">
					<a
						href="#"
						class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						Previous
					</a>
					<a
						href="#"
						class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						Next
					</a>
				</div>
				<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p class="text-sm text-gray-700">
							Showing
							<span class="font-medium">${this.pagination.startIndex + 1}</span>
							to
							<span class="font-medium">${this.pagination.endIndex + 1}</span>
							of
							<span class="font-medium">${this.pagination.totalItems}</span>
							results
						</p>
					</div>
					<div>
						<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
							<a
								href="#"
								class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span class="sr-only">Previous</span>
								${icon.solid('chevron-left', 'h-5 w-5')}
							</a>
							${this.pagination.totalPages <= 6
								? html`
										${this.pagination.pages.map(
											(page) => html`
												<a
													href="?page=${page}"
													data-page="${page}"
													${page === this.pagination.currentPage ? 'aria-current="page"' : ''}
													class="${page === this.pagination.currentPage
														? pageLinkActiveClasses
														: pageLinkDefaultClasses} relative inline-flex items-center px-4 py-2 border text-sm font-medium"
												>
													${page}
												</a>
											`,
										)}
								  `
								: html`
										<a
											href="?page=1"
											data-page="1"
											aria-current="page"
											class="${this.pagination.currentPage === 1
												? pageLinkActiveClasses
												: pageLinkDefaultClasses} relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										>
											1
										</a>
										<a
											href="?page=2"
											data-page="2"
											class="${this.pagination.currentPage === 2
												? pageLinkActiveClasses
												: pageLinkDefaultClasses} relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										>
											2
										</a>
										<a
											href="?page=3"
											data-page="3"
											class="${this.pagination.currentPage === 3
												? pageLinkActiveClasses
												: pageLinkDefaultClasses} hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
										>
											3
										</a>
										<span
											class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
										>
											...
										</span>
										<a
											href="#"
											data-page="8"
											class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
										>
											8
										</a>
										<a
											href="#"
											data-page="9"
											class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										>
											9
										</a>
										<a
											href="#"
											data-page="10"
											class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										>
											10
										</a>
								  `}
							<a
								href="#"
								class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span class="sr-only">Next</span>
								${icon.solid('chevron-right', 'h-5 w-5')}
							</a>
						</nav>
					</div>
				</div>
			</div>
		`;
	}
}
