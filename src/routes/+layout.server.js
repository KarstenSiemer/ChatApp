export const load = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user,
			//pb: locals.pb
		};
	}

	return {
		user: undefined,
		//pb: undefined
	};
};
