import { defineConfig } from 'cypress';
import ContactFactory from './database/factories/ContactFactory.js';
import OrganizationFactory from './database/factories/OrganizationFactory.js';
import UserFactory from './database/factories/UserFactory.js';

const factories = {
	contact: ContactFactory,
	organization: OrganizationFactory,
	user: UserFactory,
};

//module.exports = defineConfig({
export default defineConfig({
	downloadsFolder: 'tests/cypress/downloads',
	fixturesFolder: 'tests/cypress/fixtures',
	screenshotsFolder: 'tests/cypress/screenshots',
	videosFolder: 'tests/cypress/videos',

	chromeWebSecurity: false,
	e2e: {
		supportFile: 'tests/cypress/support/e2e.js',
		specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
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
