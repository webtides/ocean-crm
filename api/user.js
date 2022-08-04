import Validator from 'validatorjs';
import UserService from '../services/UserService';
import isAuthenticated from '../views/util/isAuthenticated';
import Event from "../events/event";
import PrismaModelChanged from "../events/prisma-model-changed";
import UserCreated from "../events/user-created";

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
			const user = await UserService.restore(userId);

			Event.emit(new PrismaModelChanged('restore', 'user', user, UserService, request));
		} else {
			const user = await UserService.delete(userId);
			Event.emit(new PrismaModelChanged('delete', 'user', user, UserService, request));
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

		Event.emit(new PrismaModelChanged('update', 'user', user, UserService, request));
		// TODO: it is easier to test this by just editing a user instead of creating a new one
		Event.emit(new UserCreated(user, request));

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

	Event.emit(new PrismaModelChanged('create', 'user', user, UserService, request));

	return response.redirect('/users'); // TODO: this should NOT be hardcoded...
};
