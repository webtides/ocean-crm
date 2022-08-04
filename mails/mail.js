import nodemailer from 'nodemailer';

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS;

export default class Mail {
	transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: MAIL_HOST,
			port: MAIL_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: MAIL_USERNAME,
				pass: MAIL_PASSWORD,
			},
		});
	}

	/**
	 * Sender address
	 * @returns {string}
	 */
	from() {
		return MAIL_FROM_ADDRESS;
	}

	/**
	 * Subject line
	 * @returns {string}
	 */
	subject() {
		return 'Hello ✔';
	}

	/**
	 * Plain text body
	 * @returns {string}
	 */
	text() {
		return 'Hello world?';
	}

	/**
	 * HTML body
	 * @returns {string}
	 */
	html() {
		return '<b>Hello world?</b>';
	}

	/**
	 * Message object
	 * @returns {{subject: string, from: string, html: string, to: string, text: string}}
	 */
	message() {
		return {
			from: this.from(),
			to: 'bar@example.com, baz@example.com', // list of receivers
			subject: this.subject(),
			text: this.text(),
			html: this.html(),
		};
	}

	static async send(mail, to) {
		let info = await mail.transporter.sendMail({
			...mail.message(),
			to,
		});
	}
}
