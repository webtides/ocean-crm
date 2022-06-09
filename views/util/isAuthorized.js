export default function (role) {
	return function (request, response, next) {
		const user = request.user;

		if (role === 'User') return next();

		if (role === 'Admin' && user.isAdmin === true) return next();
		else response.status(403).redirect('/forbidden');
	};
}
