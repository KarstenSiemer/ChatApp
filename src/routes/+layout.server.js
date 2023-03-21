export const load = ({ locals }) => {
	const user = locals.user;
	if (user) {
		return {
			user,
			isLoggedIn: true
		};
	}

	return {
		user: undefined,
		isLoggedIn: false
	};
};
