import eventsource from 'eventsource';
//import { groupsStore, chatsStore, messagesStore } from '$lib/stores.js';
global.EventSource = eventsource;
export const load = async ({locals}) => {
	// Check if user is authenticated
	if (!locals.pb.authStore.isValid) {
		return;
	}

	// Get groups
	const groups = await fetchGroups(locals.pb, locals.user);
	const chats = await fetchChats(locals.pb, locals.user);
	const messages = await fetchMessages(locals.pb, locals.user, groups.map(g => g.id), chats.map(c => c.id));

	return {
		groups,
		chats,
		messages
	}
};

const fetchGroups = async (pb, user) => {
	let groups = [];
	const groupsResultList = await pb.collection('groups').getFullList({
		sort: '-created',
		filter: `users ~ "${user.id}"`
	});
	groups = structuredClone(groupsResultList);
	return groups;
};

const fetchChats = async (pb, user) => {
	let chats = [];
	const chatsResultList = await pb.collection('chats').getFullList({
		sort: '-created',
		expand: 'users',
		filter: `users ~ "${user.id}"`
	});

	chats = structuredClone(chatsResultList);
	return chats;
};

const fetchMessages = async (pb, user, groupIds, chatsIds) => {
	let messages = [];
	let filterGroups = groupIds.map((id) => `groupID="${id}"`);
	let filterChats = chatsIds.map((id) => `chatID="${id}"`);
	let filter = filterGroups.concat(filterChats).join(' || ');
	const messagesResultList = await pb.collection('messages').getFullList({
		sort: 'created',
		expand: 'user',
		filter: filter
	});
	messages = structuredClone(messagesResultList);
	return messages;
<<<<<<< Updated upstream
=======
};

export const actions = {
	sendMessage: async ({ request, locals }) => {
		const body = await request.formData();

		const { formData, errors } = await validateData(body, sendMessage);

		if (errors) {
			return invalid(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		console.log('formData', serialize(formData));

		try {
			await locals.pb
				.collection('messages')
				.create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong sending your message');
		}
		return {
			success: true
		};
	}
>>>>>>> Stashed changes
};