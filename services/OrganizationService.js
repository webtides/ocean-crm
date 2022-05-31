import diskdb from 'diskdb';
import paginate from '../views/util/paginate';
import ContactService from "./ContactService";

const page1 = [
	{
		id: 85,
		name: 'Balistreri-Schumm',
		phone: '877-736-2543',
		city: 'Boyleburgh',
		deleted_at: null,
	},
	{
		id: 97,
		name: 'Batz-Gottlieb',
		phone: '844-970-5731',
		city: 'New Fletcherborough',
		deleted_at: null,
	},
	{
		id: 68,
		name: 'Bechtelar-Weber',
		phone: '1-800-619-9051',
		city: 'Joannebury',
		deleted_at: null,
	},
	{
		id: 70,
		name: 'Beier LLC',
		phone: '844-510-6424',
		city: 'Granvillemouth',
		deleted_at: null,
	},
	{
		id: 59,
		name: 'Bergnaum-Dibbert',
		phone: '844-560-4844',
		city: 'Effertztown',
		deleted_at: null,
	},
	{
		id: 69,
		name: 'Bernhard PLC',
		phone: '1-877-855-1590',
		city: 'Lake Filibertomouth',
		deleted_at: null,
	},
	{
		id: 49,
		name: 'Boyle-Hahn',
		phone: '1-877-504-5925',
		city: 'New Leta',
		deleted_at: null,
	},
	{
		id: 4,
		name: 'Braun, Barton and Nader',
		phone: '1-866-344-5196',
		city: 'Zoilatown',
		deleted_at: null,
	},
	{
		id: 90,
		name: 'Breitenberg-Becker',
		phone: '888.315.5402',
		city: 'Port Marcos',
		deleted_at: null,
	},
	{
		id: 66,
		name: 'Carroll and Sons',
		phone: '888.741.3683',
		city: 'Hagenestown',
		deleted_at: null,
	},
];
const page2 = [
	{
		id: 8,
		name: 'Carroll Inc',
		phone: '877-985-0534',
		city: 'South Hazel',
		deleted_at: null,
	},
	{
		id: 9,
		name: 'Collins, Ziemann and Schaefer',
		phone: '1-844-229-6179',
		city: 'Shanahanburgh',
		deleted_at: null,
	},
	{
		id: 20,
		name: 'Corkery-Nolan',
		phone: '800.370.0234',
		city: 'North Jonathonburgh',
		deleted_at: null,
	},
	{
		id: 91,
		name: 'Cormier-Cronin',
		phone: '(888) 205-6609',
		city: 'South Nicholas',
		deleted_at: null,
	},
	{
		id: 48,
		name: 'Cormier, Olson and Schuppe',
		phone: '866.691.8576',
		city: 'Fannyport',
		deleted_at: null,
	},
	{
		id: 61,
		name: 'Cummerata Ltd',
		phone: '844-612-3532',
		city: 'Nicolasport',
		deleted_at: null,
	},
	{
		id: 29,
		name: 'Cummings, Conn and Becker',
		phone: '844.571.1979',
		city: 'Bufordbury',
		deleted_at: null,
	},
	{
		id: 17,
		name: "D'Amore, Gottlieb and VonRueden",
		phone: '1-855-835-1272',
		city: 'Alfredburgh',
		deleted_at: null,
	},
	{
		id: 13,
		name: 'Dibbert LLC',
		phone: '(877) 480-6323',
		city: 'South Ludieside',
		deleted_at: null,
	},
	{
		id: 6,
		name: 'Dickens Group',
		phone: '1-855-523-4551',
		city: 'Eltamouth',
		deleted_at: null,
	},
];
const page3 = [
	{
		id: 92,
		name: 'Durgan PLC',
		phone: '877.569.2142',
		city: 'West Shanelle',
		deleted_at: null,
	},
	{
		id: 83,
		name: 'Fahey-Schinner',
		phone: '(866) 900-5267',
		city: 'Cummerataburgh',
		deleted_at: null,
	},
	{
		id: 14,
		name: 'Farrell, Bauch and Durgan',
		phone: '1-855-456-9419',
		city: 'Kreigerhaven',
		deleted_at: null,
	},
	{
		id: 75,
		name: 'Fay Group',
		phone: '877.397.0971',
		city: 'Hoytmouth',
		deleted_at: null,
	},
	{
		id: 52,
		name: "Feeney, O'Keefe and Abernathy",
		phone: '800.783.0825',
		city: 'South Alize',
		deleted_at: null,
	},
	{
		id: 81,
		name: 'Feil-Metz',
		phone: '844.392.4948',
		city: 'Kulasfort',
		deleted_at: null,
	},
	{
		id: 65,
		name: 'Fisher-Buckridge',
		phone: '866.521.9477',
		city: 'South Cathryn',
		deleted_at: null,
	},
	{
		id: 74,
		name: 'Fisher, Johnson and Roberts',
		phone: '888.296.3900',
		city: 'Nitzscheville',
		deleted_at: null,
	},
	{
		id: 45,
		name: 'Flatley-Dickinson',
		phone: '(888) 704-5178',
		city: 'Damonland',
		deleted_at: null,
	},
	{
		id: 41,
		name: 'Gerlach-Jacobs',
		phone: '877-977-6632',
		city: 'East Angelita',
		deleted_at: null,
	},
];

export default class OrganizationService {
	static init() {
		const db = diskdb.connect('./content', ['organizations']);
		if (db.organizations.count() === 0) {
			db.organizations.save([...page1, ...page2, ...page3]);
		}
	}

	static getCollection() {
		const db = diskdb.connect('./content', ['organizations']);
		return db.organizations;
	}

	static getAllOrganisations() {
		const collection = this.getCollection();
		return collection.find();
	}

	static getFilteredOrganisations(search, page) {
		const collection = this.getCollection();
		const totalOrganizations = collection.count();
		const pagination = paginate(totalOrganizations, page);

		const organizations = collection
			.find()
			.slice(pagination.startIndex, pagination.endIndex)
			.filter((organisation) => {
				if (search) {
					return JSON.stringify(organisation).includes(search);
				}
				return true;
			});

		return {
			pagination,
			organizations,
		};
	}

	static find(id) {
		const collection = this.getCollection();
		const organization = collection.findOne({ id });
		organization.contacts = ContactService.findWithOrganization(id);
		return organization;
	}

	static create(values) {
		const collection = this.getCollection();
		const id = collection.count() + 100;

		const organization = {
			id: id,
			...values,
			deleted_at: null,
		};

		return collection.save(organization);
	}

	static update(id, values) {
		const collection = this.getCollection();

		return collection.update(
			{ id },
			{ ...values },
			{
				multi: false,
				upsert: false,
			},
		);
	}

	static delete(id) {
		const collection = this.getCollection();

		return collection.update(
			{ id },
			{ deleted_at: Date.now() },
			{
				multi: false,
				upsert: false,
			},
		);
	}

	static restore(id) {
		const collection = this.getCollection();

		return collection.update(
			{ id },
			{ deleted_at: null },
			{
				multi: false,
				upsert: false,
			},
		);
	}
}
