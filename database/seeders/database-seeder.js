import UserFactory from '../factories/UserFactory.js';
import OrganizationFactory from '../factories/OrganizationFactory.js';
import ContactFactory from '../factories/ContactFactory.js';
import LogFactory from '../factories/LogFactory.js';

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export class DatabaseSeeder {
	async run() {
		const userFactory = new UserFactory();
		await userFactory.create({
			name: 'John Doe',
			email: 'admin@example.com',
			role: 'Admin',
		});

		await userFactory.createMany(5);

		const organizationFactory = new OrganizationFactory();
		const organizations = await organizationFactory.createMany(100);

		const contactFactory = new ContactFactory();
		await contactFactory.createMany(100, (index) => {
			const organization = organizations[Math.floor(Math.random() * organizations.length)];
			return {
				organizationId: organization.id,
			};
		});

		const logFactory = new LogFactory();

		await logFactory.createMany(5, (index) => {
			const createdAt = randomDate(new Date(2022, 0, 1), new Date());
			return {
				createdAt,
				logType: 'create', // create, update, delete, restore
				resourceType: 'user', // contact, organization, user
				resourceId: index,
				userId: 1,
			}
		});

		await logFactory.createMany(10, (index) => {
			const createdAt = randomDate(new Date(2022, 0, 1), new Date());
			return {
				createdAt,
				logType: 'update', // create, update, delete, restore
				resourceType: 'organization', // contact, organization, user
				resourceId: index,
				userId: 2,
			}
		});

		await logFactory.createMany(10, (index) => {
			const createdAt = randomDate(new Date(2022, 0, 1), new Date());
			return {
				createdAt,
				logType: 'delete', // create, update, delete, restore
				resourceType: 'contact', // contact, organization, user
				resourceId: index,
				userId: 3,
			}
		});

		await logFactory.createMany(10, (index) => {
			const createdAt = randomDate(new Date(2022, 0, 1), new Date());
			return {
				createdAt,
				logType: 'restore', // create, update, delete, restore
				resourceType: 'contact', // contact, organization, user
				resourceId: index * 2,
				userId: 4,
			}
		});
	}
}

const seeder = new DatabaseSeeder();
await seeder.run();
