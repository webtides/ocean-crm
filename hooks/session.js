import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import session from 'express-session';

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
};
