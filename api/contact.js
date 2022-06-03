import Validator from 'validatorjs';
import ContactService from '../services/ContactService.js';
import LogService from '../services/LogService';
import isAuthenticated from '../views/util/isAuthenticated';

export const middleware = async () => {
	return [isAuthenticated];
};

export const post = async ({ request, response }) => {
	if (request.body['_method'] && request.body['_method'] === 'delete') {
		const organizationId = request.body['contactId'];
		const restore = request.body['restore'] === 'true';

		if (restore) {
			const contact = ContactService.restore(organizationId);
			LogService.addLog('restore', 'contact', contact, request.user);
		} else {
			const contact = ContactService.delete(organizationId);
			LogService.addLog('restore', 'contact', contact, request.user);
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
		const contact = ContactService.update(organizationId, {
			name: request.body.name,
			phone: request.body.phone,
			city: request.body.city,
			organization: parseInt(request.body.organization),
		});

		LogService.addLog('update', 'contact', contact, request.user);

		return response.redirect(request.header('Referer'));
	}

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// create
	const contact = ContactService.create({
		name: request.body.name,
		phone: request.body.phone,
		city: request.body.city,
		organization: parseInt(request.body.organization),
	});

	LogService.addLog('create', 'contact', contact, request.user);

	return response.redirect('/contacts'); // TODO: this should NOT be hardcoded...
};
