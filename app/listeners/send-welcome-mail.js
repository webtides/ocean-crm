import Mail from '../mails/mail.js';
import UserCreated from '../mails/user-created.js';

export default class SendWelcomeMail {
	/**
	 * @param { UserCreated } event
	 */
	async handle(event) {
		await Mail.send(new UserCreated(event.user), event.user.email);
	}
}
