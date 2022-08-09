describe('organizations api', () => {
	beforeEach(() => {});

	// TODO: Look at https://github.com/nothingworksinc/ticketbeast/blob/master/tests/Feature/Backstage/AddConcertTest.php
	// for how to write backend api tests

	//TODO: also what about this?! https://laracasts.com/discuss/channels/laravel/request-wantsjson-returning-to-the-view-laravelvueaxios

	it('can create organization models', () => {
		// clear database
		cy.exec('npm run test:migrate');

		// TODO: https://docs.cypress.io/api/commands/request#Arguments
		cy.request({
			url: 'http://localhost:3000/api/organization',
			method: 'POST',
			body: {
				name: 'Jane Doe',
				email: 'jane@example.com',
				phone: '555nose',
				address: 'Janestreet',
				city: 'Janecity',
				region: 'Janeregion',
				country: 'CA',
				postalCode: '12345',
			},
			headers: {
				Accept: 'application/json',
			},
		}).then((response) => {
			// response.body is automatically serialized into JSON
			expect(response.body).to.have.property('name', 'Jane Doe');
		});
	});
});
