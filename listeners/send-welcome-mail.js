import Mail from '../mails/mail';
import UserCreated from '../mails/user-created';

export default class SendWelcomeMail {
	/**
	 * @param { UserCreated } event
	 */
	async handle(event) {
		await Mail.send(new UserCreated(), event.user.email);
	}
}
