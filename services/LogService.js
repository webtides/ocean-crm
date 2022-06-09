import paginate from '../views/util/paginate.js';
import BasePrismaService from './BasePrismaService.js';

export default class LogService extends BasePrismaService {
	static name() {
		return 'log';
	}

	static include() {
		return {
			user: true,
		};
	}

	static async getFilteredLogs(page, search = '') {
		const model = this.getModel();

		const allItems = await model.findMany({ include: this.include() });
		const filteredItems = allItems
			.filter((item) => {
				if (search) {
					return JSON.stringify(item).includes(search);
				}
				return true;
			})
			.sort((a, b) => b.timestamp - a.timestamp);

		const totalItems = filteredItems.length;
		const pagination = paginate(totalItems, page);

		const items = filteredItems.slice(pagination.startIndex, pagination.endIndex + 1);

		return {
			pagination,
			logs: items,
		};
	}

	static async findByUser(id) {
		const model = this.getModel();
		return await model.find({ where: { userId: parseInt(id) } });
	}

	static async addLog(logType, resourceType, resource, user) {
		return await this.create({
			logType: logType, // create, update, delete, restore
			resourceType: resourceType, // contact, organization, user
			resourceId: resource.id,
			userId: user.id,
		});
	}
}
