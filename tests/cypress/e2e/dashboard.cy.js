describe('dashboard page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('returns a 200 response', () => {
		cy.get('h1').contains('Dashboard');
	});

	it('the h1 contains the correct text', () => {
		cy.get('h1').contains('Dashboard');
	});
});
