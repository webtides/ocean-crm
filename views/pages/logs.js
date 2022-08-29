import { html } from '@webtides/element-js/src/renderer/vanilla/index.js';
import LogService from '../../app/services/LogService.js';
import isAuthenticated from '../util/isAuthenticated.js';

export const middleware = async () => {
	return [isAuthenticated];
};

export default class {
	properties() {
		return {
			title: 'Logs',
			search: '',
			page: 0,
			pagination: undefined,
			logs: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const search = request.query.search;
		const page = parseInt(request.query.page || 1);
		const { pagination, logs } = await LogService.getFilteredLogs(request.user, page, search);
		return { request, response, search, page, pagination, logs };
	}

	template() {
		return html` <log-feed logs="${JSON.stringify(this.logs)}" class="mt-8"></log-feed> `;
	}
}
