export default function (req, res, next) {
	return next(); // TODO: for local testing always return next for the moment...
	if (req.isAuthenticated()) return next();
	else res.redirect('/login');
}
