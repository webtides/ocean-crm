export const post = async ({ request, response }) => {
	request.logout(function (error) {});
	response.redirect('/login');
};
