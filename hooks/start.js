import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import OrganizationService from "../services/OrganizationService";
import ContactService from "../services/ContactService";

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	OrganizationService.init();
	ContactService.init();

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
};
