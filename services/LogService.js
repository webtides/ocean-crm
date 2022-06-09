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

	static async getFilteredLogs(user, page, search = '') {
		const model = this.getModel();

		const query = {
			include: this.include(),
		};

		if (user.id !== 1) {
			query.where = {
				userId: user.id,
			};
		}

		const allItems = await model.findMany(query);
		const filteredItems = allItems
			.filter((item) => {
				if (search) {
					return JSON.stringify(item).includes(search);
				}
				return true;
			})
			.sort((a, b) => b.createdAt - a.createdAt);

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
		return await this.find({ userId: parseInt(id) });
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
