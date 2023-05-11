import { pb } from '$lib/pocketbase'

export const handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh()
		} catch (_) {
			pb.authStore.clear()
		}
	}

	event.locals.pb = pb
	event.locals.user = structuredClone(pb.authStore.model)

	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production';
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);

	return response;
};