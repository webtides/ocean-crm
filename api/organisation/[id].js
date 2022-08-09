import Validator from 'validatorjs';
import OrganizationService from '../../app/services/OrganizationService';
import isAuthenticated from '../../views/util/isAuthenticated';
import AuthorizationService from '../../app/services/AuthorizationService.js';
import Event from "../../app/events/event";
import PrismaModelChanged from "../../app/events/prisma-model-changed";

export const middleware = async () => {
	return [isAuthenticated];
};

export const put = async ({ request, response }) => {
	const organizationId = parseInt(request.params.id);

	let validation = new Validator(request.body, {
		name: 'required',
		email: 'required|email',
		phone: 'required',
		address: 'required',
		city: 'required',
		region: 'required',
		country: 'required',
		postalCode: 'required',
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

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// update
	const organization = await OrganizationService.update(organizationId, {
		name: request.body.name,
		email: request.body.email,
		phone: request.body.phone,
		address: request.body.address,
		city: request.body.city,
		region: request.body.region,
		country: request.body.country,
		postalCode: request.body.postalCode,
	});

	// Event.emit(new PrismaModelChanged('update', 'organization', organization, OrganizationService, request));

	request.session.flash = {
		success: 'Successfully updated!',
	};

	if (request.accepts('application/json')) {
		return response.json(organization);
	}

	return response.redirect(request.header('Referer'));
}

export const remove = async ({ request, response }) => {
	const organizationId = parseInt(request.params.id);

	const restore = request.body['restore'] === 'true';

	// check if authorized
	if (!(await AuthorizationService.can(request.user, 'delete', 'organization', organizationId))) {
		// TODO: 403 redirect is not working... what is the correct thing to do here?!
		// maybe like this? https://laravel.com/docs/7.x/errors#custom-http-error-pages
		return response.status(403).redirect(request.header('Referer'));
	}

	let organization;
	if (restore) {
		organization = await OrganizationService.restore(organizationId);
	} else {
		organization = await OrganizationService.delete(organizationId);
	}

	//Event.emit(new PrismaModelChanged(restore ? 'restore' : 'delete', 'organization', organization, OrganizationService, request));

	if (request.accepts('application/json')) {
		return response.json(organization);
	}

	return response.redirect(request.header('Referer'));
};
