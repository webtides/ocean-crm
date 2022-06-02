import paginate from '../views/util/paginate';
import BaseCollectionService from './BaseCollectionService';

const seedUsers = [
	{
		id: 4,
		name: 'Marian Cronin',
		email: 'qbecker@example.net',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 1,
		name: 'John Doe',
		email: 'johndoe@example.com',
		role: 'Admin',
		deleted_at: null,
	},
	{
		id: 7,
		name: 'Enstein Exd',
		email: 'enstein@example.com',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 6,
		name: 'Augusta Little',
		email: 'runolfsson.rollin@example.org',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 2,
		name: 'Graciela Spencer',
		email: 'senger.maynard@example.com',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 3,
		name: 'Elian Toy',
		email: 'marcos.rowe@example.org',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 8,
		name: 'Haha Wow',
		email: 'wow@example.net',
		role: 'User',
		deleted_at: null,
	},
	{
		id: 5,
		name: 'Aric Yundt',
		email: 'zola.cummings@example.org',
		role: 'User',
		deleted_at: null,
	},
];

export default class UserService extends BaseCollectionService {
	static seed() {
		return seedUsers;
	}

	static name() {
		return 'users'
	}

	static getFilteredUsers(search, page, trashed = '', role = '') {
		const collection = this.getCollection();

		const filteredItems = collection
			.find()
			.filter((item) => {
				if (search) {
					return JSON.stringify(item).includes(search);
				}
				return true;
			})
			.filter((item) => {
				if (trashed && trashed === 'only') {
					return item.deleted_at !== null;
				}
				if (trashed && trashed === 'with') {
					return true;
				}
				return item.deleted_at === null;
			})
			.filter((item) => {
				if (role && role === 'User') {
					return item.role === 'User';
				}
				if (role && role === 'Admin') {
					return item.role === 'Admin';
				}
				return true;
			});

		const totalItems = filteredItems.length;
		const pagination = paginate(totalItems, page);

		const items = filteredItems.slice(pagination.startIndex, pagination.endIndex + 1);

		return {
			pagination,
			users: items,
		};
	}
}
