export const post = async ({ request, response }) => {
	if (request.body.locale) {
		response.cookie('ocean-crm-locale', request.body.locale);
	}

	return response.redirect(request.header('Referer'));
};
