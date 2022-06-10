import ContactService from '../../services/ContactService.js';

export const get = async ({ request, response }) => {
	const contactId = request.query.id;
	const contact = await ContactService.findById(contactId);
	return response.json(contact);
};
