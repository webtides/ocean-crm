import { html, TemplateElement } from '@webtides/element-js';
import { Component, MethodContext } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_BOTH,
})
export default class UsersEditPage extends TemplateElement {
	properties() {
		return {
			errors: undefined,
			oldValues: undefined,
			user: undefined,
		};
	}

	async loadDynamicProperties({ request, response }) {
		const UserService = (await import('../../../app/services/UserService.js')).default;
		const AuthorizationService = (await import('../../../app/services/AuthorizationService.js')).default;

		const userId = parseInt(request.params.id);
		const user = userId ? await UserService.findById(userId) : undefined;

		const errors = request.session?.errors;
		const oldValues = request.session?.oldValues;

		const can = {
			deleteUser: await AuthorizationService.can(request.user, 'delete', 'user', userId),
		};

		return { request, response, userId, errors, oldValues, user, can };
	}

	template() {
		const roleOptions = [
			{
				value: 'User',
				label: 'User',
			},
			{
				value: 'Admin',
				label: 'Admin',
			},
		];
		return html`
			<div>
				${this.deleteUserTemplate()}
				<div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
					<form method="post" action="/api/user">
						<input type="hidden" name="_method" value="put" />
						<input type="hidden" name="userId" value="${this.userId}" />
						<div class="flex flex-wrap -mb-8 -mr-6 p-8">
							<text-input
								name="name"
								value="${this.oldValues?.name || this.user?.name}"
								error="${this.errors?.name}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Name"
							></text-input>
							<text-input
								name="email"
								value="${this.oldValues?.email || this.user?.email}"
								error="${this.errors?.email}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Email"
							></text-input>
							<text-input
								name="password"
								value="${this.oldValues?.password || this.contact?.password}"
								error="${this.errors?.password}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Password"
							></text-input>
							<select-input
								name="role"
								value="${this.oldValues?.role || this.user?.role}"
								error="${this.errors?.role?.join(',')}"
								options="${JSON.stringify(roleOptions)}"
								class="pb-8 pr-6 w-full lg:w-1/2"
								label="Role"
							></select-input>
						</div>
						<div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
							<button class="btn-primary" type="submit">${this.user ? 'Update' : 'Create'} User</button>
						</div>
					</form>
				</div>
			</div>
		`;
	}

	deleteUserTemplate() {
		return html`
			${this.user && this.can?.deleteUser
				? html`
						${this.user?.deletedAt
							? html`
									<form
										method="post"
										action="/api/user"
										class="p-4 bg-yellow-300 rounded flex items-center justify-between max-w-3xl mb-6"
									>
										<input type="hidden" name="_method" value="delete" />
										<input type="hidden" name="userId" value="${this.userId}" />
										<input type="hidden" name="restore" value="true" />
										<div class="flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												class="flex-shrink-0 w-4 h-4 fill-yellow-800 mr-2"
											>
												<path
													d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
												></path>
											</svg>
											<div class="text-sm font-medium text-yellow-800">
												This user has been deleted.
											</div>
										</div>
										<button type="submit" class="text-sm text-yellow-800 hover:underline">
											Restore
										</button>
									</form>
							  `
							: html`
									<form method="post" action="/api/user" class="py-4 flex justify-end max-w-3xl">
										<input type="hidden" name="_method" value="delete" />
										<input type="hidden" name="userId" value="${this.userId}" />
										<input type="hidden" name="restore" value="false" />
										<button type="submit" class="text-red-600 hover:underline">Delete User</button>
									</form>
							  `}
				  `
				: ''}
		`;
	}
}
