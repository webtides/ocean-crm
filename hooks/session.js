import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import passport from 'passport';

export const name = HOOKS.MIDDLEWARE_REGISTER;

export default async ({ app }) => {
	if (!process.env.SESSION_SECRET) {
		throw new Error('SESSION_SECRET env var not set!');
	}

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: true,
		}),
	);

	app.use(passport.authenticate('session'));

	app.use(cookieParser());

	app.use(methodOverride((request, response) => {
		if (request.body && typeof request.body === 'object' && '_method' in request.body) {
			// look in urlencoded POST bodies and delete it
			const method = request.body['_method'];
			delete request.body['_method'];
			return method;
		}
	}))
};
