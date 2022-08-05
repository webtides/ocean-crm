import { defineConfig } from 'cypress';
import ContactFactory from "./database/factories/ContactFactory.js";
import OrganizationFactory from './database/factories/OrganizationFactory.js';
import UserFactory from "./database/factories/UserFactory.js";

const factories = {
	contact: ContactFactory,
	organisation: OrganizationFactory,
	user: UserFactory,
}

//module.exports = defineConfig({
export default defineConfig({
	chromeWebSecurity: false,
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on('task', {
				async create(options) {
					const factory = new factories[options.model]();
					const item = await factory.create(options.properties);
					return item;
				},
				async createMany(options) {
					const factory = new factories[options.model]();
					const items = await factory.createMany(options.count, options.properties);
					return items;
				},
			});
		},
	},
});
