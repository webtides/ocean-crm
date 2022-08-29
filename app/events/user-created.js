import Event from './event.js';

export default class UserCreated extends Event {
	static eventName = 'ocean-crm-user-created';
	user;
	request;

	constructor(user, request) {
		super();
		this.user = user;
		this.request = request;
	}
}
