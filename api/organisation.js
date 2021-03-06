import Validator from 'validatorjs';
import OrganizationService from '../services/OrganizationService';
import LogService from '../services/LogService';
import isAuthenticated from '../views/util/isAuthenticated';
import AuthorizationService from '../services/AuthorizationService.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export const post = async ({ request, response }) => {
	if (request.body['_method'] && request.body['_method'] === 'delete') {
		const organizationId = request.body['organizationId'];
		const restore = request.body['restore'] === 'true';

		// check if authorized
		if (!(await AuthorizationService.can(request.user, 'delete', 'organization', organizationId))) {
			// TODO: 403 redirect is not working... what is the correct thing to do here?!
			// maybe like this? https://laravel.com/docs/7.x/errors#custom-http-error-pages
			return response.status(403).redirect(request.header('Referer'));
		}

		if (restore) {
			const organization = OrganizationService.restore(organizationId);
			await LogService.addLog('restore', 'organization', organization, request.user);
		} else {
			const organization = OrganizationService.delete(organizationId);
			await LogService.addLog('delete', 'organization', organization, request.user);
		}

		return response.redirect(request.header('Referer'));
	}

	let validation = new Validator(request.body, {
		name: 'required',
		// email: 'required|email',
		phone: 'required',
		// address: 'required',
		city: 'required',
		// region: 'required',
		// country: 'required',
		// postalCode: 'required',
	});

	if (validation.fails()) {
		request.session.errors = validation.errors.all();
		request.session.oldValues = {
			name: request.body.name,
			email: request.body.email,
			phone: request.body.phone,
			address: request.body.address,
			city: request.body.city,
			region: request.body.region,
			country: request.body.country,
			postalCode: request.body.postalCode,
		};
		return response.redirect(request.header('Referer'));
	}

	if (request.body['_method'] && request.body['_method'] === 'put') {
		request.session.errors = undefined;
		request.session.oldValues = undefined;

		// update
		const organizationId = request.body['organizationId'];
		const organization = await OrganizationService.update(organizationId, {
			name: request.body.name,
			phone: request.body.phone,
			city: request.body.city,
		});

		await LogService.addLog('update', 'organization', organization, request.user);

		request.session.flash = {
			success: 'Successfully updated!',
		};

		return response.redirect(request.header('Referer'));
	}

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// create
	const organization = await OrganizationService.create({
		name: request.body.name,
		phone: request.body.phone,
		city: request.body.city,
	});

	await LogService.addLog('create', 'organization', organization, request.user);

	return response.redirect('/organizations'); // TODO: this should NOT be hardcoded...
};
