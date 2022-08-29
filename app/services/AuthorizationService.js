export default class AuthorizationService {
	static async can(user, action, resource, resourceId) {
		if (action === 'delete') {
			if (resource === 'user') {
				if (user.id === 1) {
					return true;
				}
				return user.id === resourceId;
			}

			return user.id === 1;
		}
	}
}
