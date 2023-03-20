export const load = ({ locals }) => {
	console.log('locals.user:', locals.user);
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	}
};
