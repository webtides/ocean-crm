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
		const { pagination, users } = UserService.getFilteredUsers(search, page, trashed, role);
		return { request, response, search, page, trashed, role, pagination, users };
	}

	template() {
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
						<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table class="min-w-full divide-y divide-gray-300">
									<thead class="bg-gray-50">
										<tr>
											<th
												scope="col"
												class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
											>
												Name
											</th>
											<th
												scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Email
											</th>
											<th
												scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Role
											</th>
											<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
												<span class="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody class="bg-white">
										${this.users.map(
											(user) => html`
												<tr class="odd:bg-white even:bg-slate-50">
													<td
														class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
													>
														${user.name}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														${user.email}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														${user.role}
													</td>
													<td
														class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
													>
														<a
															href="/users/${user.id}/edit"
															class="text-indigo-600 hover:text-indigo-900"
															>Edit<span class="sr-only">, ${user.name}</span></a
														>
													</td>
												</tr>
											`,
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
