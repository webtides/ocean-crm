import paginate from '../views/util/paginate';
import BaseCollectionService from './BaseCollectionService';

const seedLogs = [
	{
		id: 1,
		type: 'create', // create, update, delete, restore
		resource: 'user', // contact, organization, user
		resourceName: 'Jane Doe',
		resourceId: 48,
		timestamp: 1654241957773,
		userName: 'John Doe',
	},
	{
		id: 1,
		type: 'update', // create, update, delete, restore
		resource: 'organization', // contact, organization, user
		resourceName: 'Acme Corp.',
		resourceId: 48,
		timestamp: 1654241954773,
		userName: 'John Doe',
	},
	{
		id: 1,
		type: 'delete', // create, update, delete, restore
		resource: 'contact', // contact, organization, user
		resourceName: 'Jim Smith',
		resourceId: 48,
		timestamp: 1654241957763,
		userName: 'John Doe',
	},
];

export default class LogService extends BaseCollectionService {
	static seed() {
		return seedLogs;
	}

	static name() {
		return 'logs';
	}

	static getFilteredLogs(userId, page, search = '') {
		const collection = this.getCollection();

		const filteredItems = collection
			.find()
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

	static findByUser(id) {
		const collection = this.getCollection();
		return collection.find({ userId: id });
	}

	static addLog(activityType, resourceType, resource, user) {
		console.log({ activityType, resourceType, resource, user });
		const values = {
			type: activityType, // create, update, delete, restore
			resource: resourceType, // contact, organization, user
			resourceName: resource.name,
			resourceId: resource.id,
			timestamp: Date.now(),
			userName: user.name,
		};

		this.create(values);
	}
}
