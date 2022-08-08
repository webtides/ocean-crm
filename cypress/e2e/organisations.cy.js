describe('organisations overview', () => {
	beforeEach(() => {});

	it('the h1 contains the correct text & has a link to create a new organisation', () => {
		cy.visit('http://localhost:3000/organisations');
		cy.get('h1').contains('Organisations');
		cy.get('a').contains('Add organisation').invoke('attr', 'href').should('contain', '/organisations/create');
	});

	it('shows name, phone and city for organisations in table', () => {
		// clear database
		cy.exec('npm run test:migrate');

		// create entries via factory
		cy.task('create', {
			model: 'organisation',
			properties: { name: 'Name 1', phone: '555nose', city: 'Gotham City' },
		});

		cy.visit('http://localhost:3000/organisations');

		cy.get('body').should('contain', 'Name 1');
		cy.get('body').should('contain', '555nose');
		cy.get('body').should('contain', 'Gotham City');
	});

	it('shows a paginated list of all organisations', () => {
		// clear database
		cy.exec('npm run test:migrate');

		// create entries via factory
		cy.task('createMany', {
			model: 'organisation',
			count: 11,
			properties: [
				{ name: 'Name 1' },
				{ name: 'Name 2' },
				{ name: 'Name 3' },
				{ name: 'Name 4' },
				{ name: 'Name 5' },
				{ name: 'Name 6' },
				{ name: 'Name 7' },
				{ name: 'Name 8' },
				{ name: 'Name 9' },
				{ name: 'Name 10' },
				{ name: 'Name 11' },
			],
		});

		cy.visit('http://localhost:3000/organisations');

		cy.get('body').should('contain', 'Name 1');
		cy.get('body').should('contain', 'Name 10');
		cy.get('body').should('not.contain', 'Name 11');
	});

	it('can create a new organisation', () => {
		// clear database
		cy.exec('npm run test:migrate');

		cy.visit('http://localhost:3000/organisations/create');

		cy.get('input[name="name"]').type('John Doe');
		cy.get('input[name="email"]').type('john@example.com');
		cy.get('input[name="phone"]').type('555nose');
		cy.get('input[name="address"]').type('Street 13');
		cy.get('input[name="city"]').type('City');
		cy.get('input[name="region"]').type('State');
		cy.get('select[name="country"]').select('CA');
		cy.get('input[name="postalCode"]').type('12345');
		cy.get('button').contains('Create Organization').click();

		// assert redirect
		cy.url().should('equal', 'http://localhost:3000/organisations');

		cy.get('body').should('contain', 'John Doe');
		cy.get('body').should('contain', '555nose');
		cy.get('body').should('contain', 'City');
	});

	it('validates the request when creating a new organisation', () => {
		// clear database
		cy.exec('npm run test:migrate');

		cy.visit('http://localhost:3000/organisations/create');

		cy.get('button').contains('Create Organization').click();

		cy.url().should('equal', 'http://localhost:3000/organisations/create');

		cy.get('body').should('contain', 'The name field is required');
		cy.get('body').should('contain', 'The email field is required');
		cy.get('body').should('contain', 'The phone field is required');
		cy.get('body').should('contain', 'The address field is required');
		cy.get('body').should('contain', 'The city field is required');
		cy.get('body').should('contain', 'The region field is required');
		cy.get('body').should('contain', 'The country field is required');
		cy.get('body').should('contain', 'The postalCode field is required');

		cy.get('input[name="email"]').type('john');
		cy.get('button').contains('Create Organization').click();

		cy.url().should('equal', 'http://localhost:3000/organisations/create');

		cy.get('body').should('contain', 'The email format is invalid');
	});

	it('can edit an organisation', () => {
		// clear database
		cy.exec('npm run test:migrate');

		// create a new organisation via factory
		cy.task('create', {
			model: 'organisation',
			properties: { name: 'John Doe', phone: '555nose', city: 'Atlantis' },
		});

		cy.visit('http://localhost:3000/organisations');

		cy.get('body').should('contain', 'John Doe');
		cy.get('body').should('contain', '555nose');
		cy.get('body').should('contain', 'Atlantis');

		cy.get('a').contains('Edit').click();

		const organisationId = 1; // TODO: do not hardcode the id...
		cy.url().should('equal', `http://localhost:3000/organisations/${organisationId}/edit`);

		cy.get('input[name="name"]').clear().type('Jane Doe');
		cy.get('input[name="phone"]').clear().type('888nose');
		cy.get('input[name="city"]').clear().type('Village');

		// TODO: find out why the country field is empty...
		cy.get('select[name="country"]').select('CA');

		cy.get('button').contains('Update Organization').click();

		// assert redirect
		cy.url().should('equal', `http://localhost:3000/organisations/${organisationId}/edit`);

		cy.visit('http://localhost:3000/organisations');

		cy.get('body').should('not.contain', 'John Doe');
		cy.get('body').should('not.contain', '555nose');
		cy.get('body').should('not.contain', 'Atlantis');

		cy.get('body').should('contain', 'Jane Doe');
		cy.get('body').should('contain', '888nose');
		cy.get('body').should('contain', 'Village');
	});

	it('validates the request when editing an organisation', () => {
		// clear database
		cy.exec('npm run test:migrate');

		// create a new organisation via factory
		cy.task('create', {
			model: 'organisation',
			properties: { name: 'John Doe', phone: '555nose', city: 'Atlantis' },
		});

		const organisationId = 1; // TODO: do not hardcode the id...
		cy.visit(`http://localhost:3000/organisations/${organisationId}/edit`);

		cy.get('input[name="name"]').clear();
		cy.get('input[name="email"]').clear();
		cy.get('input[name="phone"]').clear();
		cy.get('input[name="address"]').clear();
		cy.get('input[name="city"]').clear();
		cy.get('input[name="region"]').clear();
		cy.get('select[name="country"]').select('');
		cy.get('input[name="postalCode"]').clear();
		cy.get('button').contains('Update Organization').click();

		cy.url().should('equal', `http://localhost:3000/organisations/${organisationId}/edit`);

		cy.get('body').should('contain', 'The name field is required');
		cy.get('body').should('contain', 'The email field is required');
		cy.get('body').should('contain', 'The phone field is required');
		cy.get('body').should('contain', 'The address field is required');
		cy.get('body').should('contain', 'The city field is required');
		cy.get('body').should('contain', 'The region field is required');
		cy.get('body').should('contain', 'The country field is required');
		cy.get('body').should('contain', 'The postalCode field is required');

		cy.get('input[name="email"]').type('john');
		cy.get('button').contains('Update Organization').click();

		cy.url().should('equal', `http://localhost:3000/organisations/${organisationId}/edit`);

		cy.get('body').should('contain', 'The email format is invalid');
	});
});
