import { faker } from '@faker-js/faker';

export default class PrismaFactory {
	faker = faker;

	properties() {}

	model() {
		return undefined;
	}

	// TODO: make it possible to auto create relations like in laravel (https://laravel.com/docs/9.x/database-testing#has-many-relationships)

	async create(properties) {
		return await this.model().create({
			data: {
				...this.properties(properties),
			},
		});
	}

	async createMany(count, properties) {
		const items = [];
		for (let index = 0; index < count; index++) {
			const customProperties = typeof properties === 'function' ? properties(index + 1) : properties?.[index];
			const item = await this.create(customProperties);
			items.push(item);
		}
		return items;
	}
}
