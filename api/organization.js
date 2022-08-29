import Validator from 'validatorjs';
import OrganizationService from '../app/services/OrganizationService.js';
import isAuthenticated from '../views/util/isAuthenticated.js';
import Event from '../app/events/event.js';
import PrismaModelChanged from '../app/events/prisma-model-changed.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export const get = async ({ request, response }) => {
	const organizations = await OrganizationService.getAll();

	if (request.accepts('application/json')) {
		return response.json(organizations);
	}
};

export const post = async ({ request, response }) => {
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

	// create
	const organization = await OrganizationService.create({
		name: request.body.name,
		email: request.body.email,
		phone: request.body.phone,
		address: request.body.address,
		city: request.body.city,
		region: request.body.region,
		country: request.body.country,
		postalCode: request.body.postalCode,
	});

	//Event.emit(new PrismaModelChanged('create', 'organization', organization, OrganizationService, request));

	if (request.is('application/json') && request.accepts('application/json')) {
		return response.json(organization);
	}

	return response.redirect('/organizations'); // TODO: this should NOT be hardcoded...
};
