import Validator from 'validatorjs';
import OrganizationService from '../services/OrganizationService';
import isAuthenticated from '../views/util/isAuthenticated';
import Event from "../events/event";
import PrismaModelChanged from "../events/prisma-model-changed";

export const middleware = async () => {
	return [isAuthenticated];
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

	return response.redirect('/organisations'); // TODO: this should NOT be hardcoded...
};
