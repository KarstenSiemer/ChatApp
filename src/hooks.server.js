import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	// Create a new PocketBase instance
	event.locals.pb = new PocketBase(POCKETBASE_URL);

	// Load the authStore from the cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// Check if the user is authenticated
		if (event.locals.pb.authStore.isValid) {
			// Refresh the user's authentication
			await event.locals.pb.collection('users').authRefresh();

			// Set the user in the locals object
			event.locals.user = structuredClone(event.locals.pb.authStore.model);
		}
	} catch (err) {
		// Clear the authStore if there is an error
		event.locals.pb.authStore.clear();
	}

	// Resolve the request
	const response = await resolve(event);

	// Set the cookie
	const isProd = process.env.NODE_ENV === 'production';
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);

	return response;
};
