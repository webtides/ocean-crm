import { LunaService } from '@webtides/luna-js';
import paginate from '../../views/util/paginate.js';
import BasePrismaService from './BasePrismaService.js';

@LunaService({
	name: 'ContactService',
})
export default class ContactService extends BasePrismaService {
	static name() {
		return 'contact';
	}

	static include() {
		return {
			organization: true,
		};
	}

	static async getFilteredContacts(search, page, trashed = '') {
		const model = this.getModel();

		const query = {
			include: this.include(),
		};

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

		query.where = where;

		const allItems = await model.findMany(query);
		const filteredItems = allItems.filter((item) => {
			if (search) {
				return JSON.stringify(item).includes(search);
			}
			return true;
		});

		const totalItems = filteredItems.length;
		const pagination = paginate(totalItems, page);

		const items = filteredItems.slice(pagination.startIndex, pagination.endIndex + 1);

		return {
			pagination,
			contacts: items,
		};
	}

	static async findWithOrganization(id) {
		const model = this.getModel();
		return await model.findMany({
			where: {
				organizationId: parseInt(id),
			},
		});
	}
}
