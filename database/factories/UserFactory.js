import { PrismaClient } from '@prisma/client';
import PrismaFactory from './PrismaFactory.js';
const prisma = new PrismaClient();
import crypto from 'crypto';

export default class UserFactory extends PrismaFactory {
	model() {
		return prisma.user;
	}

	properties(properties) {
		const salt = crypto.randomBytes(16).toString('hex');
		const password = crypto.pbkdf2Sync('secret', salt, 1000, 64, `sha512`).toString(`hex`);

		const firstName = this.faker.name.firstName();
		const lastName = this.faker.name.lastName();

		return {
			// deletedAt: null,
			name: `${firstName} ${lastName}`,
			email: this.faker.internet.email(firstName, lastName),
			role: 'User',
			password,
			salt,
			...properties,
		};
	}

	relations() {
		return {
			// posts: {
			// 	create: { title: 'Hello World' },
			// },
			// profile: {
			// 	create: { bio: 'I like turtles' },
			// },
		}
	}
}
