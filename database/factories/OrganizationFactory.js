import { PrismaClient } from '@prisma/client';
import PrismaFactory from './PrismaFactory.js';
const prisma = new PrismaClient();

export default class OrganizationFactory extends PrismaFactory {
	model() {
		return prisma.organization;
	}

	properties(properties) {
		return {
			// deletedAt: null,
			name: this.faker.company.companyName(),
			phone: this.faker.phone.phoneNumber(),
			city: this.faker.address.city(),
			...properties,
		};
	}
}
