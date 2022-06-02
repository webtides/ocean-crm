import diskdb from 'diskdb';
import fetch from 'node-fetch';

export default class BaseCollectionService {
	static seed() {
		return [];
	}

	static name() {
		return undefined;
	}

	static getCollection() {
		const name = this.name();
		const db = diskdb.connect('./content', [name]);
		return db[name];
	}

	static init() {
		const collection = this.getCollection();
		if (collection.count() === 0) {
			collection.save([...this.seed()]);
		}
	}

	static getAll() {
		const collection = this.getCollection();
		return collection.find();
	}

	static getDeleted() {
		const collection = this.getCollection();
		return collection.find().filter((item) => {
			return item.deleted_at !== null;
		});
	}

	static find(query) {
		const collection = this.getCollection();
		return collection.findOne(query);
	}

	static findById(id) {
		const collection = this.getCollection();
		return collection.findOne({ id });
	}

	static create(values) {
		const collection = this.getCollection();
		const id = collection.count() + 100;

		const organization = {
			id: id,
			...values,
			deleted_at: null,
		};

		const saved = collection.save(organization);

		this.notifyEvents();

		return saved;
	}

	static update(id, values) {
		const collection = this.getCollection();

		collection.update(
			{ id },
			{ ...values },
			{
				multi: false,
				upsert: false,
			},
		);

		this.notifyEvents();

		return this.findById(id);
	}

	static delete(id) {
		const collection = this.getCollection();

		collection.update(
			{ id },
			{ deleted_at: Date.now() },
			{
				multi: false,
				upsert: false,
			},
		);

		this.notifyEvents();

		return this.findById(id);
	}

	static restore(id) {
		const collection = this.getCollection();

		collection.update(
			{ id },
			{ deleted_at: null },
			{
				multi: false,
				upsert: false,
			},
		);

		this.notifyEvents();

		return this.findById(id);
	}

	static notifyEvents() {
		// TODO: there must be a better way... Maybe EventEmitter?!
		fetch('http://localhost:3000/api/events', {
			method: 'post',
			body: JSON.stringify({
				[this.name()]: {
					total: this.getAll().length,
					deleted: this.getDeleted().length,
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
