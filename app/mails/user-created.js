import fetch from 'node-fetch';
import Mail from './mail.js';

export default class UserCreated extends Mail {
	user;

	constructor(user) {
		super();
		this.user = user;
	}

	async html() {
		const data = {
			name: this.user.name,
		};

		// TODO: this should probably not be an http request... ask lukas if we could get pages/components programmatically.
		const response = await fetch(`http://localhost:3000/mails/user-created?data=${JSON.stringify(data)}`);

		// TODO: this contains a lot of stuff that mail browsers probably can't understand like script type module etc...
		return await response.text();
	}
}
