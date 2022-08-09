import UserService from '../../app/services/UserService.js';

export const get = async ({ request, response }) => {
	const userId = request.query.id;
	const user = await UserService.findById(userId);
	return response.json(user);
};
