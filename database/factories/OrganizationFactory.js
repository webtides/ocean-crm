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
			email: this.faker.internet.email(),
			phone: this.faker.phone.phoneNumber(),
			address: this.faker.address.street(),
			city: this.faker.address.city(),
			region: this.faker.address.state(),
			country: 'CA', //this.faker.address.countryCode(),
			postalCode: this.faker.address.zipCode(),
			...properties,
		};
	}
}
