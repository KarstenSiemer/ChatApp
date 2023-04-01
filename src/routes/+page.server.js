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

	//groups = groupsResultList.items;
	groups = structuredClone(groupsResultList);


	pb.collection('groups').subscribe('*', function (e) {
		groups = [...groups, e.record];
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

	pb.collection('chats').subscribe('*', function (e) {
		chats = [...chats, e.record];
	});
	return chats;
};

const fetchMessages = async (pb, user, groupIds, chatsIds) => {
	let messages = [];
	let filterGroups = groupIds.map((id) => `groupID="${id}"`);
	let filterChats = chatsIds.map((id) => `chatID="${id}"`);
	let filter = filterGroups.concat(filterChats).join(' || ');
	const messagesResultList = await pb.collection('messages').getFullList({
		sort: '-created',
		expand: 'user',
		filter: filter
	});
	messages = structuredClone(messagesResultList);
	pb.collection('messages').subscribe('*', function (e) {
		messages = [...messages, e.record];
	});
	return messages;
};