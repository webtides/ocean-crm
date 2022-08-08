import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import PrismaModelChanged from '../events/prisma-model-changed';
const prisma = new PrismaClient();

export default class BasePrismaService {
	static name() {
		return undefined;
	}

	static select() {
		return null;
	}

	static include() {
		return null;
	}

	static getModel() {
		return prisma[this.name()];
	}

	// TODO: think about how to fluently build the query

	static async getAll() {
		const model = this.getModel();

		const include = this.include();

		const query = {};

		if (include) {
			query.include = include;
		}

		return await model.findMany(query);
	}

	static async getDeleted() {
		const model = this.getModel();
		return await model.findMany({
			where: {
				deletedAt: {
					not: null,
				},
			},
		});
	}

	static async find(where, select = this.select(), include = this.include()) {
		const model = this.getModel();

		const query = {
			where: where,
		};

		if (select) {
			query.select = select;
		}

		if (include) {
			query.include = include;
		}

		return await model.findUnique(query);
	}

	static async findById(id) {
		return await this.find({ id: parseInt(id) });
	}

	static async create(properties) {
		const model = this.getModel();

		const item = await model.create({
			data: {
				...properties,
			},
		});

		return item;
	}

	static async update(id, properties) {
		const model = this.getModel();

		const item = await model.update({
			where: { id: parseInt(id) },
			data: {
				...properties,
			},
		});


		return item;
	}

	static async delete(id) {
		const model = this.getModel();

		const item = await model.update({
			where: { id: parseInt(id) },
			data: {
				deletedAt: new Date(),
			},
		});


		return item;
	}

	static async restore(id) {
		const model = this.getModel();

		const item = await model.update({
			where: { id: parseInt(id) },
			data: {
				deletedAt: null,
			},
		});


		return item;
	}
}
