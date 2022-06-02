import Validator from 'validatorjs';
import UserService from "../services/UserService";

export const post = async ({ request, response }) => {
	if (request.body['_method'] && request.body['_method'] === 'delete') {
		const userId = parseInt(request.body['userId']);
		const restore = request.body['restore'] === 'true';

		if (userId === 1) {
			request.session.flash = {
				error: 'Deleting the demo user is not allowed.',
			}
			return response.redirect(request.header('Referer'));
		}

		if (restore) {
			UserService.restore(userId);
		} else {
			UserService.delete(userId);
		}

		return response.redirect(request.header('Referer'));
	}

	let validation = new Validator(request.body, {
		name: 'required',
		email: 'required|email',
		// password: 'required',
		role: 'required',
	});

	if (validation.fails()) {
		request.session.errors = validation.errors.all();
		request.session.oldValues = {
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
			role: request.body.role,
		};
		return response.redirect(request.header('Referer'));
	}

	if (request.body['_method'] && request.body['_method'] === 'put') {
		request.session.errors = undefined;
		request.session.oldValues = undefined;

		const userId = parseInt(request.body['userId']);


		if (userId === 1) {
			request.session.flash = {
				error: 'Updating the demo user is not allowed.',
			}
			return response.redirect(request.header('Referer'));
		}

		// update
		UserService.update(userId, {
			name: request.body.name,
			email: request.body.email,
			// password: request.body.password,
			role: request.body.role,
		});

		return response.redirect(request.header('Referer'));
	}

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// create
	UserService.create({
		name: request.body.name,
		email: request.body.email,
		// password: request.body.password,
		role: request.body.role,
	});

	return response.redirect('/users'); // TODO: this should NOT be hardcoded...
};
