import Validator from 'validatorjs';
import UserService from '../services/UserService';
import LogService from '../services/LogService';
import isAuthenticated from '../views/util/isAuthenticated';

export const middleware = async () => {
	return [isAuthenticated];
};

export const post = async ({ request, response }) => {
	if (request.body['_method'] && request.body['_method'] === 'delete') {
		const userId = parseInt(request.body['userId']);
		const restore = request.body['restore'] === 'true';

		if (userId === 1) {
			request.session.flash = {
				error: 'Deleting the demo user is not allowed.',
			};
			return response.redirect(request.header('Referer'));
		}

		if (restore) {
			const user = UserService.restore(userId);
			await LogService.addLog('restore', 'user', user, request.user);
		} else {
			const user = UserService.delete(userId);
			await LogService.addLog('delete', 'user', user, request.user);
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
			};
			return response.redirect(request.header('Referer'));
		}

		// update
		const user = await UserService.update(userId, {
			name: request.body.name,
			email: request.body.email,
			// password: request.body.password,
			role: request.body.role,
		});

		await LogService.addLog('update', 'user', user, request.user);

		return response.redirect(request.header('Referer'));
	}

	request.session.errors = undefined;
	request.session.oldValues = undefined;

	// create
	const user = await UserService.create({
		name: request.body.name,
		email: request.body.email,
		// password: request.body.password,
		role: request.body.role,
	});

	// TODO: I think it would be better to just emit an event here and have a global listener somewhere
	// the Event should take the request as a property...
	await LogService.addLog('create', 'user', user, request.user);

	return response.redirect('/users'); // TODO: this should NOT be hardcoded...
};
