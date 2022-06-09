import { html } from '@webtides/element-js/src/renderer/vanilla';
import LogService from '../../services/LogService';
import isAuthenticated from '../util/isAuthenticated';

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
		const { pagination, logs } = await LogService.getFilteredLogs(page, search);
		return { request, response, search, page, pagination, logs };
	}

	template() {
		return html`
			<log-feed logs='${JSON.stringify(this.logs)}' class="mt-8"></log-feed>
		`;
	}
}
