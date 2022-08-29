export default function (req, res, next) {
	// check if we should impersonate a user and then log them it
	// this needs to be done on every request and cannot be done for the whole session
	if (req.session.impersonate) {
		req.logIn(req.session.impersonate, () => {});
		return next();
	} else {
		// TODO: for local testing always return next for the moment...
		req.logIn(
			{
				id: 1,
				email: 'admin@example.com',
				name: 'John Doe',
				isAdmin: true,
			},
			() => {},
		);
		return next();
	}

	// if (req.isAuthenticated()) return next();
	// else res.redirect('/login');
}
