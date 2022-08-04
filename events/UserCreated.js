import Event from './event';

export default class UserCreated extends Event {
	static eventName = 'ocean-crm-user-created';
	user;
	request;

	constructor(user, request) {
		super();
		this.user = user;
		this.request = request;
	}

	static dispatch(user, request) {
		const event = new UserCreated(user, request);
		event.emit();
	}
}
