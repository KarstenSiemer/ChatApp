<script>
	import { ChatBubble } from '$lib/components';
<<<<<<< Updated upstream
=======
	import {invalidateAll} from "$app/navigation";
	import {enhance, applyAction} from "$app/forms";
	import { Input } from '$lib/components';
	import { onMount, onDestroy } from 'svelte';
	import PocketBase from 'pocketbase';

>>>>>>> Stashed changes
	export let data;
	let active = undefined;
	let active_type = "";

	$: groups = data.groups;
	$: chats = data.chats;
	$: messages = data.messages?.filter(function (el) {
		return el.groupID === active || el.chatID === active
		return false;
	});
	function makeActive(id, type) {
		active = id;
		active_type = type;
	}
<<<<<<< Updated upstream
=======

	export let form;
	let loading;

	$: loading = false;
	const submitMessage = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const clearFormFields = (node) => {
		const clearForm = () => {
			node.reset();
		};
		node.addEventListener('submit', clearForm);
		return {
			destroy() {
				node.removeEventListener('submit', clearForm);
			}
		};
	};

	let unsubscribeMessages;
	let unsubscribeChats;
	let unsubscribeGroups;

	export const pb = new PocketBase('http://127.0.0.1:8090');

	onMount(async () => {
		// Subscribe to realtime messages
		unsubscribeMessages = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const user = await pb.collection('users').getOne(record.user);
				record.expand = {user};
				messages = [...messages, record];
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
		unsubscribeChats = await pb.collection('chats').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const user = await pb.collection('users').getOne(record.user);
				record.expand = {user};
				chats = [...chats, record];
			}
			if (action === 'delete') {
				chats = chats.filter((m) => m.id !== record.id);
			}
		});
		unsubscribeGroups = await pb.collection('groups').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				groups = [...groups, record];
			}
			if (action === 'delete') {
				groups = groups.filter((m) => m.id !== record.id);
			}
		});
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		unsubscribeMessages?.();
		unsubscribeChats?.();
		unsubscribeGroups?.();
	});

>>>>>>> Stashed changes
</script>

{#if data.user}
	<div class="flex flex-row gap-4 h-full">
		<div class="basis-1/5 overflow-y-scroll">
			<ul class="menu bg-base-100 w-56 rounded-box">
				<li class="menu-title">
					<span>Groups</span>
				</li>
				{#each groups as group (group.id)}
					<li><button on:click="{makeActive(group.id, 'group')}" class="font-normal rounded-box hover:shadow-md {active === group.id ? 'active' : ''}" id="{group.id}">{group.name}</button></li>
				{/each}
				<li class="menu-title">
					<span>Chats</span>
				</li>
				{#each chats as chat (chat.id)}
				<li>
					<button on:click="{makeActive(chat.id, 'chat')}" class="font-normal rounded-box hover:shadow-md {active === chat.id ? 'active' : ''} " id="{chat.id}">
					{chat.expand.users.filter(function (el) {
						return el.id !== data.user.id
					})[0].name}
					</button>
				</li>
				{/each}
			</ul>
		</div>
		<div class="bg-base-200 p-8 rounded-box shadow-md flex flex-col flex-grow justify-between overflow-y-scroll">
			{#each messages as message (message.id)}
				<ChatBubble
					type="{message?.expand?.user?.id === data.user.id ? 'end' : 'start'}"
					writer="{message?.expand?.user?.name}"
					sent="{new Date(message.created).toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit'})}";
					message="{message.content}"
					avatar="{message?.expand?.user?.avatar}"
					collectionId="{message?.expand?.user?.collectionId}"
					userId="{message?.expand?.user?.id}"
					status="delivered"
				/>
			{/each}
			{#if active}
			  <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full" />
			{/if}
		</div>
	</div>
{:else}
	<div class="hero flex-grow h-full bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Hello there</h1>
				<p class="py-6">Please login to use the ChatApp!</p>
			</div>
		</div>
	</div>
{/if}