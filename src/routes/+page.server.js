import eventsource from 'eventsource';
//import { groupsStore, chatsStore, messagesStore } from '$lib/stores.js';
global.EventSource = eventsource;

import { error, invalid } from '@sveltejs/kit';
import { sendMessage } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { serialize } from 'object-to-formdata';

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

	//groups = groupsResultList.items;
	groups = structuredClone(groupsResultList);


	pb.collection('groups').subscribe('*', function (e) {
		groups = [...groups, e.record];
	});

	pb.collection('groups').subscribe('*', async ({ action, record }) => {
		if (action === 'create') {
			groups = [...groups, record];
		}
		if (action === 'delete') {
			groups = groups.filter((m) => m.id !== record.id);
		}
	});
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

	pb.collection('chats').subscribe('*', async ({ action, record }) => {
		if (action === 'create') {
			const user = await pb.collection('users').getOne(record.user);
			record.expand = {user};
			chats = [...chats, record];
		}
		if (action === 'delete') {
			chats = chats.filter((m) => m.id !== record.id);
		}
	});
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
	pb.collection('messages').subscribe('*', async ({ action, record }) => {
		if (action === 'create') {
			const user = await pb.collection('users').getOne(record.user);
			record.expand = {user};
			messages = [...messages, record];
		}
		if (action === 'delete') {
			messages = messages.filter((m) => m.id !== record.id);
		}
	});
	return messages;
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

			throw error(400, 'Something went wrong updating your profile');
		}
		return {
			success: true
		};
	}
};