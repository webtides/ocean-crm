import paginate from '../views/util/paginate.js';
import BasePrismaService from './BasePrismaService.js';

export default class OrganizationService extends BasePrismaService {
	static name() {
		return 'organization';
	}

	static include() {
		return {
			contacts: true,
		};
	}

	static async getFilteredOrganisations(search, page, trashed = '') {
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

		const allItems = await model.findMany({ where });
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
			organizations: items,
		};
	}
}
