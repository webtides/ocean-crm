import { html, fixture, fixtureSync, defineCE, assert, expect, nextFrame } from '@open-wc/testing';

import PaginationComponent from "../../views/components/pagination-component.js";
customElements.define('pagination-component', PaginationComponent);

describe('pagination-component', () => {
	it('has a default pagination of undefined', async () => {
		const el = await fixture(html` <pagination-component></pagination-component> `);

		expect(el.pagination).to.equal(undefined);
	});
});
