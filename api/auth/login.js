import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../../app/services/UserService';

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(
	new LocalStrategy(async function verify(username, password, done) {
		const user = await UserService.find({ email: username }, {
			...UserService.select(),
			password: true,
			salt: true,
		});

		if (!user) {
			return done(null, false, { message: 'Incorrect username or password.' });
		}

		if (!UserService.checkPassword(user, password)) {
			return done(null, false, { message: 'Incorrect username or password.' });
		}

		return done(null, {
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.role === 'Admin',
		});
	}),
);

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

export const middleware = async () => {
	return [
		passport.authenticate('local', {
			successReturnToOrRedirect: '/',
			failureRedirect: '/login',
			failureMessage: true,
		}),
	];
};

export const post = async ({ request, response }) => {};
