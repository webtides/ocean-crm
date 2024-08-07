// import { html } from '@webtides/element-js';

import UserService from '../../app/services/UserService.js';
import icon from '../partials/icon.js';
import { I18nService } from '../../app/services/I18nService.js';

const layout = async (page, context = {}) => {
	const now = Date.now();

	const currentPath = context.request?.url || '/';
	const navLinkActiveClasses = 'border-primary-500 text-gray-900';
	const navLinkDefaultClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

	const user = context.request.user;
	const userNameInitials = user?.name
		.split(' ')
		.map((n) => n[0])
		.join('');

	const allUsers = await UserService.getAll();
	const otherUsers = allUsers.filter((otherUser) => otherUser.id !== user?.id);

	const i18nService = new I18nService(['en', 'de'], 'en');
	const locales = i18nService.getLocales();
	const currentLocale = context.request.cookies['ocean-crm-locale'] || 'en';
	const translations = i18nService.getTranslations(currentLocale);

	return /* HTML */ `
		<!DOCTYPE html>
		<html lang="" class="h-full bg-gray-100">
			<head>
				<title>${context.title ? `${context.title} | Ocean CRM` : 'Ocean CRM'}</title>

				<meta charset="UTF-8" />
				<link href="/assets/css/main.css?${now}" type="text/css" rel="stylesheet" />
				<link href="/assets/css/base.css?${now}" type="text/css" rel="stylesheet" />
				<link rel="icon" href="/assets/images/logo/vector/default-monochrome.svg" type="image/svg+xml" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				${context.head ?? ''}

				<script>
					globalThis.elementjs = {
						i18n: function () {
							return ${JSON.stringify(translations)};
						},
					};
				</script>
			</head>
			<body class="h-full">
				<div class="min-h-full">
					<nav class="bg-white shadow-sm">
						<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div class="flex justify-between h-16">
								<div class="flex gap-4">
									<div class="flex-shrink-0 flex gap-4 items-center">
										<img
											class="block h-8 w-auto"
											src="/assets/images/logo/vector/default-monochrome.svg"
											alt="Ocean CRM"
										/>
										<img
											class="hidden lg:block h-4 w-auto"
											src="/assets/images/logo/vector/isolated-monochrome-black.svg"
											alt="Ocean CRM"
										/>
									</div>
									<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
										<a
											href="/"
											class="${currentPath === '/'
												? navLinkActiveClasses
												: navLinkDefaultClasses} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
											aria-current="page"
											>Dashboard</a
										>

										<a
											href="/organizations"
											class="${currentPath.includes('/organizations')
												? navLinkActiveClasses
												: navLinkDefaultClasses} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
											>Organizations</a
										>

										<a
											href="/contacts"
											class="${currentPath.includes('/contacts')
												? navLinkActiveClasses
												: navLinkDefaultClasses} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
											>Contacts</a
										>

										<a
											href="/logs"
											class="${currentPath.includes('/logs')
												? navLinkActiveClasses
												: navLinkDefaultClasses} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
											>Logs</a
										>
									</div>
								</div>
								<div class="hidden sm:ml-6 sm:flex sm:items-center">
									<button
										type="button"
										class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
									>
										<span class="sr-only">View notifications</span>
										${icon.outline('bell', 'h-6 w-6')}
									</button>

									<!-- Profile dropdown -->
									<div class="ml-3 relative">
										<dropdown-button>
											<button
												slot="trigger"
												type="button"
												class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
												id="user-menu-button"
												aria-expanded="false"
												aria-haspopup="true"
											>
												<span class="sr-only">Open user menu</span>
												<span
													class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
												>
													<span class="text-md font-medium leading-none text-white"
														>${userNameInitials}</span
													>
												</span>
											</button>
											<!--
											  Dropdown menu, show/hide based on menu state.

											  Entering: "transition ease-out duration-200"
												From: "transform opacity-0 scale-95"
												To: "transform opacity-100 scale-100"
											  Leaving: "transition ease-in duration-75"
												From: "transform opacity-100 scale-100"
												To: "transform opacity-0 scale-95"
											-->
											<div
												slot="content"
												class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="user-menu-button"
												tabindex="-1"
											>
												<form
													action="/api/locale"
													method="post"
													class="block px-4 py-2 text-sm text-gray-700"
												>
													<select
														name="locale"
														class="form-select w-full"
														onchange="this.form.submit()"
													>
														${locales?.map(
															(locale) => `
																<option value="${locale}" ${locale === currentLocale ? 'selected' : ''}>${locale}</option>
															`,
														)}
													</select>
												</form>

												<!-- Active: "bg-gray-100", Not Active: "" -->
												<a
													href="/users/${user?.id || 1}/edit"
													class="block px-4 py-2 text-sm text-gray-700"
													role="menuitem"
													tabindex="-1"
													id="user-menu-item-0"
													>Your Profile</a
												>

												${user?.isAdmin
													? `
															<a
																href="/users"
																class="block px-4 py-2 text-sm text-gray-700"
																role="menuitem"
																tabindex="-1"
																id="user-menu-item-1"
																>Manage Users</a
															>
												`
													: ``}
												${user?.isAdmin
													? `
															<a
																href="/settings"
																class="block px-4 py-2 text-sm text-gray-700"
																role="menuitem"
																tabindex="-1"
																id="user-menu-item-12"
																>Settings</a
															>
												`
													: ``}
												${user?.isAdmin
													? `
													<form action="/api/auth/impersonate" method="post" class="block px-4 py-2 text-sm text-gray-700">
														<input type="hidden" name="adminId" value="${user.id}">
														<select name="userId" class="form-select w-full" onchange="this.form.submit()">
															<option value="">Impersonate User</option>
															${otherUsers?.map(
																(user) => `
																	<option value="${user.id}">${user.name}</option>
																`,
															)}
														</select>
													</form>
												`
													: ``}
												${user?.isImpersonatedBy
													? `
													<form action="/api/auth/impersonate" method="post" class="block px-4 py-2 text-sm text-gray-700">
														<input type="hidden" name="adminId" value="${user.isImpersonatedBy.id}">
														<button
															type="submit"
															class="block text-sm text-gray-700"
															role="menuitem"
															tabindex="-1"
															id="user-menu-item-2"
														>Undo Impersonation</button
													>
													</form>
												`
													: ``}

												<form action="/api/auth/logout" method="post">
													<button
														type="submit"
														class="block px-4 py-2 text-sm text-gray-700"
														role="menuitem"
														tabindex="-1"
														id="user-menu-item-3"
													>
														Sign out
													</button>
												</form>
											</div>
										</dropdown-button>
									</div>
								</div>
								<div class="-mr-2 flex items-center sm:hidden">
									<!-- Mobile menu button -->
									<button
										type="button"
										class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
										aria-controls="mobile-menu"
										aria-expanded="false"
									>
										<span class="sr-only">Open main menu</span>
										${icon.outline('menu', 'block h-6 w-6')} ${icon.outline('x', 'hidden h-6 w-6')}
									</button>
								</div>
							</div>
						</div>

						<!-- Mobile menu, show/hide based on menu state. -->
						<div class="sm:hidden" id="mobile-menu">
							<div class="pt-2 pb-3 space-y-1">
								<!-- Current: "bg-primary-50 border-primary-500 text-primary-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
								<a
									href="#"
									class="bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
									aria-current="page"
									>Dashboard</a
								>

								<a
									href="#"
									class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
									>Team</a
								>

								<a
									href="#"
									class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
									>Projects</a
								>

								<a
									href="#"
									class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
									>Calendar</a
								>
							</div>
							<div class="pt-4 pb-3 border-t border-gray-200">
								<div class="flex items-center px-4">
									<div class="flex-shrink-0">
										<img
											class="h-10 w-10 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div class="ml-3">
										<div class="text-base font-medium text-gray-800">Tom Cook</div>
										<div class="text-sm font-medium text-gray-500">tom@example.com</div>
									</div>
									<button
										type="button"
										class="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
									>
										<span class="sr-only">View notifications</span>
										${icon.outline('bell', 'h-6 w-6')}
									</button>
								</div>
								<div class="mt-3 space-y-1">
									<a
										href="#"
										class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
										>Your Profile</a
									>

									<a
										href="#"
										class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
										>Settings</a
									>

									<form action="/api/auth/logout" method="post">
										<button
											type="submit"
											class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
										>
											Sign out
										</button>
									</form>
								</div>
							</div>
						</div>
					</nav>

					<main class="py-10">
						<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<flash-message></flash-message>
							<h1 class="text-3xl font-bold leading-tight text-gray-900">
								${context.title || 'Dashboard'}
							</h1>
							<div class="mt-6">${page ?? ''}</div>
						</div>
					</main>
				</div>
				<notification-stack></notification-stack>
			</body>
		</html>
	`;
};

export default layout;
