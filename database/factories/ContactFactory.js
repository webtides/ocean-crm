import { PrismaClient } from '@prisma/client';
import PrismaFactory from './PrismaFactory.js';
const prisma = new PrismaClient();

export default class ContactFactory extends PrismaFactory {
	model() {
		return prisma.contact;
	}

	properties(properties) {
		const firstName = this.faker.name.firstName();
		const lastName = this.faker.name.lastName();

		return {
			// deletedAt: null,
			name: `${firstName} ${lastName}`,
			email: this.faker.internet.email(firstName, lastName),
			phone: this.faker.phone.phoneNumber(),
			city: this.faker.address.city(),
			...properties,
		};
	}
}
