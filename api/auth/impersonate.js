import UserService from '../../services/UserService';

export const post = async ({ request, response }) => {
	const userId = request.body['userId'];
	const adminId = request.body['adminId'];

	if (userId) {
		const user = UserService.findById(parseInt(userId));
		request.session.impersonate = {
			id: user.id,
			email: user.email,
			name: user.name,
			isImpersonatedBy: adminId,
		};
	} else {
		request.session.impersonate = undefined;
	}

	response.redirect('/');
};
