import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class BasePrismaService {
	static name() {
		return undefined;
	}

	static include() {
		return undefined;
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

	static async find(query) {
		const model = this.getModel();
		return await model.findUnique(query);
	}

	static async findById(id) {
		const model = this.getModel();

		const include = this.include();

		const query = {
			where: {
				id: parseInt(id),
			},
		};

		if (include) {
			query.include = include;
		}

		return await model.findUnique(query);
	}

	static async create(properties) {
		const model = this.getModel();

		const item = await model.create({
			data: {
				...properties,
			},
		});

		this.notifyEvents();

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

		this.notifyEvents();

		console.log('update', item);

		return item;
	}

	static async delete(id) {
		const model = this.getModel();

		const item = await model.update({
			where: { id: parseInt(id) },
			data: {
				deletedAt: Date.now(),
			},
		});

		this.notifyEvents();

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

		this.notifyEvents();

		return item;
	}

	static notifyEvents() {
		// TODO: there must be a better way... Maybe EventEmitter?!
		fetch('http://localhost:3000/api/events', {
			method: 'post',
			body: JSON.stringify({
				[this.name()]: {
					total: this.getAll().length,
					// deleted: this.getDeleted().length,
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
