import OrganizationService from '../../app/services/OrganizationService.js';

export const get = async ({ request, response }) => {
	const organizationId = request.query.id;
	const organization = await OrganizationService.findById(organizationId);
	return response.json(organization);
};
