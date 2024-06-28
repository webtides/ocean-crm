import { html, TemplateElement } from '@webtides/element-js';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class SearchFilter extends TemplateElement {
	properties() {
		return {
			search: '',
			trashed: '',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { search: request.query.search, trashed: request.query.trashed };
	}

	template() {
		return html`
			<form method="get" class="flex items-center">
				<div class="flex w-full bg-white rounded shadow">
					<dropdown-button
						class="block focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring md:px-6"
					>
						<div slot="trigger" class="flex items-baseline py-3 cursor-pointer">
							<span class="hidden text-gray-700 md:inline">Filter</span>
							<svg
								class="w-2 h-2 fill-gray-700 md:ml-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 961.243 599.998"
							>
								<path
									d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z"
								/>
							</svg>
						</div>
						<div
							slot="content"
							class="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg px-4 py-6 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<label class="block text-gray-700">Trashed:</label>
							<select name="trashed" class="form-select mt-1 w-full">
								<option value=""></option>
								<option value="with" ${this.trashed === 'with' ? 'selected' : ''}>With Trashed</option>
								<option value="only" ${this.trashed === 'only' ? 'selected' : ''}>Only Trashed</option>
							</select>
						</div>
					</dropdown-button>
					<input
						class="relative px-6 py-3 w-full rounded-r focus:shadow-outline"
						autocomplete="off"
						type="text"
						name="search"
						placeholder="Search…"
						value="${this.search}"
					/>
				</div>
				<button class="ml-3 text-gray-500 hover:text-gray-700 focus:text-primary-500 text-sm" type="submit">
					Filter
				</button>
			</form>
		`;
	}
}
