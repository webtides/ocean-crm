import Validator from 'validatorjs';
import ContactService from '../app/services/ContactService.js';
import isAuthenticated from '../views/util/isAuthenticated.js';
import PrismaModelChanged from '../app/events/prisma-model-changed.js';
import Event from '../app/events/event.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export const post = async ({ request, response }) => {
	if (request.body['_method'] && request.body['_method'] === 'delete') {
		const contactId = request.body['contactId'];
		const restore = request.body['restore'] === 'true';

		if (restore) {
			const contact = await ContactService.restore(contactId);
			Event.emit(new PrismaModelChanged('restore', 'contact', contact, ContactService, request));
		} else {
			const contact = await ContactService.delete(contactId);
			Event.emit(new PrismaModelChanged('delete', 'contact', contact, ContactService, request));
		}

		return response.redirect(request.header('Referer'));
	}

	let validation = new Validator(request.body, {
		name: 'required',
		phone: 'required',
		city: 'required',
		organization: 'required',
	});

	if (validation.fails()) {
		request.session.errors = validation.errors.all();
		request.session.oldValues = {
			name: request.body.name,
			phone: request.body.phone,
			city: request.body.city,
			organization: request.body.organization,
		};
		return response.redirect(request.header('Referer'));
	}

	if (request.body['_method'] && request.body['_method'] === 'put') {
		request.session.errors = undefined;
		request.session.oldValues = undefined;

		// update
		const organizationId = request.body['contactId'];
		const contact = await ContactService.update(organizationId, {
			name: request.body.name,
			phone: request.body.phone,
			city: request.body.city,
			organizationId: parseInt(request.body.organization),
		});

		Event.emit(new PrismaModelChanged('update', 'contact', contact, ContactService, request));

		return response.redirect(request.header('Referer'));
	}

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// create
	const contact = await ContactService.create({
		name: request.body.name,
		phone: request.body.phone,
		city: request.body.city,
		organizationId: parseInt(request.body.organization),
	});

	Event.emit(new PrismaModelChanged('create', 'contact', contact, ContactService, request));

	return response.redirect('/contacts'); // TODO: this should NOT be hardcoded...
};
