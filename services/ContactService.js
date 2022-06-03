import paginate from '../views/util/paginate';
import BaseCollectionService from './BaseCollectionService';

const seedContacts = [
	{
		id: 41,
		name: 'Maud Abernathy',
		phone: '(800) 254-0651',
		city: 'Davisstad',
		deleted_at: null,
		organization: {
			name: 'Conn-Feeney',
		},
	},
	{
		id: 88,
		name: 'Elisha Bailey',
		phone: '(866) 396-0641',
		city: 'Walterbury',
		deleted_at: null,
		organization: {
			name: 'Deckow, Kreiger and Konopelski',
		},
	},
	{
		id: 34,
		name: 'Florian Barrows',
		phone: '877.781.8199',
		city: 'Ruthiehaven',
		deleted_at: null,
		organization: {
			name: 'Rutherford-Deckow',
		},
	},
	{
		id: 24,
		name: 'King Beatty',
		phone: '(888) 550-3509',
		city: 'Krajcikshire',
		deleted_at: null,
		organization: {
			name: 'Terry, Upton and Gorczany',
		},
	},
	{
		id: 33,
		name: 'Enrique Bergnaum',
		phone: '1-877-891-9738',
		city: 'Ruthieshire',
		deleted_at: null,
		organization: {
			name: 'Kautzer, Jakubowski and Abernathy',
		},
	},
	{
		id: 79,
		name: 'Karelle Bernier',
		phone: '(888) 914-9397',
		city: 'Bechtelarshire',
		deleted_at: null,
		organization: {
			name: 'Deckow, Kreiger and Konopelski',
		},
	},
	{
		id: 85,
		name: 'Norbert Boehm',
		phone: '877.354.8139',
		city: 'East Ursulashire',
		deleted_at: null,
		organization: {
			name: 'Stroman-Goyette',
		},
	},
	{
		id: 61,
		name: 'Carter Bogan',
		phone: '877-604-2524',
		city: 'Lake Coy',
		deleted_at: null,
		organization: {
			name: 'Reichel Group',
		},
	},
	{
		id: 57,
		name: 'Leta Borer',
		phone: '1-800-288-9359',
		city: 'North Carter',
		deleted_at: null,
		organization: {
			name: 'McCullough-Harvey',
		},
	},
	{
		id: 43,
		name: 'Gene Cassin',
		phone: '1-866-423-0625',
		city: 'Murraystad',
		deleted_at: null,
		organization: {
			name: 'Wilderman PLC',
		},
	},
	{
		id: 1,
		name: 'Anita Christiansen',
		phone: '(877) 329-4014',
		city: 'Yostmouth',
		deleted_at: null,
		organization: {
			name: 'Conn-Feeney',
		},
	},
	{
		id: 98,
		name: 'Mariela Considine',
		phone: '1-844-542-5015',
		city: 'Lake Lessiechester',
		deleted_at: null,
		organization: {
			name: 'Smitham, Mertz and Collins',
		},
	},
	{
		id: 83,
		name: 'Alene Crona',
		phone: '866.551.8576',
		city: 'Lake Rebecaville',
		deleted_at: null,
		organization: {
			name: 'Bartoletti, Hyatt and Pacocha',
		},
	},
	{
		id: 28,
		name: 'Clare Dach',
		phone: '1-844-271-7970',
		city: 'West Oscar',
		deleted_at: null,
		organization: {
			name: 'Zieme-Herzog',
		},
	},
	{
		id: 44,
		name: 'Jarrell Deckow',
		phone: '855.348.6668',
		city: 'East Alexandrine',
		deleted_at: null,
		organization: {
			name: 'Deckow, Kreiger and Konopelski',
		},
	},
	{
		id: 99,
		name: 'Ned Denesik',
		phone: '(877) 962-0562',
		city: 'Haleightown',
		deleted_at: null,
		organization: {
			name: 'Purdy, Jacobs and Stiedemann',
		},
	},
	{
		id: 86,
		name: 'Veronica Dicki',
		phone: '(866) 783-7973',
		city: 'Schneiderton',
		deleted_at: null,
		organization: {
			name: 'Schinner PLC',
		},
	},
	{
		id: 22,
		name: 'Linnea Durgan',
		phone: '800-986-9081',
		city: 'Larryport',
		deleted_at: null,
		organization: {
			name: 'Blanda-Jaskolski',
		},
	},
	{
		id: 6,
		name: 'Cortez Emmerich',
		phone: '(855) 783-9640',
		city: 'Janisland',
		deleted_at: null,
		organization: {
			name: 'Grant Inc',
		},
	},
	{
		id: 81,
		name: 'Weston Fay',
		phone: '1-800-728-7296',
		city: 'New Kristaport',
		deleted_at: null,
		organization: {
			name: 'Jacobi-Bradtke',
		},
	},
	{
		id: 93,
		name: 'Guadalupe Feeney',
		phone: '877-860-6885',
		city: 'Friesenfurt',
		deleted_at: null,
		organization: {
			name: 'Quigley Inc',
		},
	},
	{
		id: 82,
		name: 'Ezekiel Gaylord',
		phone: '(888) 807-4781',
		city: 'Filomenamouth',
		deleted_at: null,
		organization: {
			name: 'Dietrich-Lesch',
		},
	},
	{
		id: 31,
		name: 'Scottie Gaylord',
		phone: '800.313.0831',
		city: 'South Loycetown',
		deleted_at: null,
		organization: {
			name: 'Schinner PLC',
		},
	},
	{
		id: 95,
		name: 'Sanford Gerhold',
		phone: '844-420-0590',
		city: 'New Abelardofurt',
		deleted_at: null,
		organization: {
			name: 'Maggio-Fisher',
		},
	},
	{
		id: 29,
		name: 'Bertha Gislason',
		phone: '866.674.7327',
		city: 'Swaniawskiland',
		deleted_at: null,
		organization: {
			name: 'Gibson, Gleason and Wiza',
		},
	},
	{
		id: 47,
		name: 'Annie Gusikowski',
		phone: '1-844-637-7567',
		city: 'Gerrybury',
		deleted_at: null,
		organization: {
			name: 'Dietrich-Lesch',
		},
	},
	{
		id: 5,
		name: 'Bessie Haag',
		phone: '1-866-457-5211',
		city: 'West Kathlyn',
		deleted_at: null,
		organization: {
			name: 'Cruickshank LLC',
		},
	},
	{
		id: 77,
		name: 'Mariano Halvorson',
		phone: '855.663.6277',
		city: 'Karlieberg',
		deleted_at: null,
		organization: {
			name: 'Schinner PLC',
		},
	},
	{
		id: 64,
		name: 'Xzavier Hayes',
		phone: '888.607.5223',
		city: 'Noemibury',
		deleted_at: null,
		organization: {
			name: 'Cummerata PLC',
		},
	},
	{
		id: 48,
		name: 'Johnny Herman',
		phone: '1-888-373-1136',
		city: 'Juliobury',
		deleted_at: null,
		organization: {
			name: 'Wilderman PLC',
		},
	},
];

export default class ContactService extends BaseCollectionService {
	static seed() {
		return seedContacts;
	}

	static name() {
		return 'contacts';
	}

	static getFilteredContacts(search, page, trashed = '') {
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
			});

		const totalItems = filteredItems.length;
		const pagination = paginate(totalItems, page);

		const items = filteredItems.slice(pagination.startIndex, pagination.endIndex + 1);

		return {
			pagination,
			contacts: items,
		};
	}

	static findWithOrganization(id) {
		const collection = this.getCollection();
		return collection.find({ organization: id });
	}
}
