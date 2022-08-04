import { html } from '@webtides/element-js/src/renderer/vanilla';

export default class {
	properties() {
		return {
			data: {
				name: 'User name',
			},
		};
	}

	async loadDynamicProperties({ request, response }) {
		let data = {
			name: 'User name',
		};
		if (request.query.data) {
			data = JSON.parse(request.query.data);
		}
		return { request, response, data };
	}

	layout() {
		return 'mail';
	}

	template() {
		return html`
			<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div class="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						class="mx-auto h-16 w-auto"
						src="/assets/images/logo/vector/default-monochrome.svg"
						alt="Ocean CRM"
					/>
					<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to Ocean CRM 🎉</h2>
					<p class="mt-2 text-center text-sm text-gray-600">
						Hi
						<a href="#" class="font-medium text-primary-600 hover:text-primary-500"> ${this.data.name} </a>
						👋
					</p>
				</div>

				<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<div class="space-y-6">
							<p>
								A new user account has been created for you. Follow the link below to accept the invite
								and change your password.
							</p>

							<div>
								<a
									href="#"
									class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								>
									Sign in
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
