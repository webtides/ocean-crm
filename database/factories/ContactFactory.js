import { PrismaClient } from '@prisma/client';
import PrismaFactory from './PrismaFactory.js';
const prisma = new PrismaClient();

export default class ContactFactory extends PrismaFactory {
	model() {
		return prisma.contact;
	}

	properties(properties) {
		return {
			// deletedAt: null,
			name: `${this.faker.name.firstName()} ${this.faker.name.lastName()}`,
			phone: this.faker.phone.phoneNumber(),
			city: this.faker.address.city(),
			...properties,
		};
	}
}
