import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import OrganizationService from '../services/OrganizationService';
import ContactService from '../services/ContactService';
import UserService from '../services/UserService';
import LogService from "../services/LogService";
// import crypto from 'crypto';

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	OrganizationService.init();
	ContactService.init();
	UserService.init();
	LogService.init();

	// const organizationsCollection = OrganizationService.getCollection();
	// const contactsCollection = ContactService.getCollection();
	// contactsCollection.find().forEach(item => {
	// 	const organizationName = item.organization.name;
	//
	// 	const organization = organizationsCollection.find()[Math.floor(Math.random()*organizationsCollection.count())];
	//
	// 	if (organization) {
	// 		ContactService.update(item.id, {
	// 			...item,
	// 			organization: organization.id,
	// 		})
	// 	}
	// })

	// adding password and salt for all users
	// password: secret

	// const salt = crypto.randomBytes(16).toString('hex');
	// const password = crypto.pbkdf2Sync('secret', salt, 1000, 64, `sha512`).toString(`hex`);
	// const usersCollection = UserService.getCollection();
	// usersCollection.find().forEach((user) => {
	// 	UserService.update(user.id, {
	// 		...user,
	// 		password,
	// 		salt,
	// 	});
	// });
};
