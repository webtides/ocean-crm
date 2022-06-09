import paginate from '../views/util/paginate.js';
import BasePrismaService from './BasePrismaService.js';
import crypto from 'crypto';

export default class UserService extends BasePrismaService {
	static name() {
		return 'user';
	}

	static select() {
		return {
			id: true,
			deletedAt: true,
			name: true,
			email: true,
			password: false,
			salt: false,
			role: true,
		};
	}

	static async getFilteredUsers(search, page, trashed = '', role = '') {
		const model = this.getModel();

		// TODO: full-text search is not available for SQLite...
		// https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search
		const where = {};

		if (trashed) {
			if (trashed === 'only') {
				where.deletedAt = { not: null };
			}
			if (trashed === 'with') {
				// don't filter
			}
		} else {
			where.deletedAt = null;
		}

		if (role) {
			where.role = role;
		}

		const allItems = await model.findMany({ where });
		const filteredItems = allItems.filter((item) => {
			if (search) {
				return JSON.stringify(item).includes(search);
			}
			return true;
		});

		// TODO: use pagination from prisma...

		const totalItems = filteredItems.length;
		const pagination = paginate(totalItems, page);

		const items = filteredItems.slice(pagination.startIndex, pagination.endIndex + 1);

		return {
			pagination,
			users: items,
		};
	}

	static checkPassword(user, password) {
		const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
		return user.password === hash;
	}
}
