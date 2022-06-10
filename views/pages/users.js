import { html } from '@webtides/element-js/src/renderer/vanilla';
import UserService from '../../services/UserService';
import isAuthenticated from '../util/isAuthenticated';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Users',
			search: '',
			trashed: '',
			role: '',
			page: 0,
			pagination: undefined,
			users: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const trashed = request.query.trashed;
		const role = request.query.role;
		const page = parseInt(request.query.page || 1);
		const { pagination, users } = await UserService.getFilteredUsers(search, page, trashed, role);
		return { request, response, search, page, trashed, role, pagination, users };
	}

	template() {
		const fields = {
			name: 'Name',
			email: 'Email',
			role: 'Role',
		};

		return html`
			<div class="">
				<div class="sm:flex sm:items-center">
					<div class="sm:flex-auto">
						<search-filter class="block w-full max-w-md"></search-filter>
					</div>
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<a
							href="/users/create"
							class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
							>Add user</a
						>
					</div>
				</div>
				<div class="mt-8 flex flex-col">
					<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<resource-overview-table
							resource="user"
							pagination="${JSON.stringify(this.pagination)}"
							items="${JSON.stringify(this.users)}"
							overviewfields="${JSON.stringify(fields)}"
							previewfields="${JSON.stringify(fields)}"
						></resource-overview-table>
					</div>
				</div>
			</div>
		`;
	}
}
