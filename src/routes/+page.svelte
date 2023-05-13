<script>
	import { ChatBubble } from '$lib/components';
	import {invalidateAll} from "$app/navigation";
	import {enhance, applyAction} from "$app/forms";
	import { Input } from '$lib/components';
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '$lib/pocketbase'
	import { getImageURL } from '$lib/utils';
	import MdGroup from 'svelte-icons/md/MdGroup.svelte';
	import FaTrash from 'svelte-icons/fa/FaTrashAlt.svelte'

	export let data;
	let active = undefined;
	let active_type = "";
	let max_w_lg = false;

	let triggerRendering = 0;

	$: groups = data.groups;
	$: chats = data.chats;
	$: allUsers = data.allUsers
	$: allGroups = data.allGroups

	$: console.log(allUsers.map(input => input.avatar))

	$: messages = data.messages?.filter(function (el) {
		return el.groupID === active || el.chatID === active
	});
	function makeActive(id, type) {
		active = id;
		active_type = type;
	}

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
	let unsubscribeUsers;

	onMount(async () => {
		// Subscribe to realtime messages
		unsubscribeMessages = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				const user = await pb.collection('users').getOne(record.user);
				record.expand = {user};
				if ( groups.some(group => group.id === record.groupID) || chats.some(chat => chat.id === record.chatID) ) {
					messages = [...messages, record];
				}
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
		unsubscribeChats = await pb.collection('chats').subscribe('*', async ({ action, record }) => {
			if (action === 'create' || action === 'update') {
				let filter = record.users.map((id) => `id="${id}"`).join(' || ');
				const users = await pb.collection('users').getFullList({
					sort: '-created',
					filter: filter
				});
				record.expand = {users};
				chats = [...chats, record];
			}
			if (action === 'delete') {
				chats = chats.filter((m) => m.id !== record.id);
			}
		});
		unsubscribeGroups = await pb.collection('groups').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				allGroups = [...allGroups, record];
			}
			if (action === 'update') {
				if ( record.users.includes(data.user.id) ) {
					groups = [...groups, record];
				} else {
					groups = groups.filter((m) => m.id !== record.id);
				}
			}
			if (action === 'delete') {
				groups = groups.filter((m) => m.id !== record.id);
			}
		});
		unsubscribeUsers = await pb.collection('groups').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				allUsers = [...allUsers, record];
			}
		});
	});

	async function deleteChatReference(id, type) {
		console.log("deleting " + type + " with id " + id)

		if (type === 'group') {
			pb.collection('groups').getOne(id)
					.then((document) => {
						const currentList = document.users || []; // if the field does not exist, initialize an empty array
						const newList = currentList.filter(u => u !== data.user.id); // add the new element to the current list
						console.log("setting users of group to: " + newList)
						pb.collection('groups').update(id, {
							users: newList
						}).then((result) => {
							console.log('List field updated:', result.users);
						}).catch((error) => {
							console.error('Error updating list field:', error);
						});
					}).catch((error) => {
				console.error('Error getting document:', error);
			});
		} else if (type === 'chat') {
			pb.collection('chats').getOne(id)
					.then((document) => {
						const currentList = document.hiddenFrom || []; // if the field does not exist, initialize an empty array
						const newList = [...currentList, data.user.id]// add the new element to the current list
						console.log("setting hiddenFrom of chat to: " + newList)
						pb.collection('chats').update(id, {
							hiddenFrom: newList
						}).then((result) => {
							console.log('List field updated:', result.hiddenFrom);
						}).catch((error) => {
							console.error('Error updating list field:', error);
						});
					}).catch((error) => {
				console.error('Error getting document:', error);
			});
		}

		triggerRendering ++;
		active = undefined;
		active_type = "";
	}

	async function addChatReferenceIfNotExiting(id, type) {
		console.log("adding chat reference if not exiting: " + id + " " + type)
		if (type === 'group') {
			console.log(groups.map(group => group.id))
			if (!groups.map(group => group.id).includes(id)) {
				console.log("joining group")
				pb.collection('groups').getOne(id)
						.then((document) => {
							const currentList = document.users || []; // if the field does not exist, initialize an empty array
							const newList = [...currentList, data.user.id]; // add the new element to the current list
							pb.collection('groups').update(id, {
								users: newList
							}).then((result) => {
								console.log('List field updated:', result);
							}).catch((error) => {
								console.error('Error updating list field:', error);
							});
						}).catch((error) => {
					console.error('Error getting document:', error);
				});
			}
		}
		if (type === 'chat') {
			let chat = chats.filter(chat => chat.users.includes(id))[0]
			console.log("result for chat with user " + id + ": " + chat)
			if (!chat) {
				console.log("initiating chat with user: " + id)

				const newDocument = {
					"users": [
						id,
						data.user.id
					]
				};

				await pb.collection('chats').create(newDocument)
						.then( (result) => {
							console.log('New document created:', result);
							id = result.id
							 pb.collection('chats').getOne(result.id)
						}).catch((error) => {
							console.error('Error creating new document:', error);
						});

			}
		}
		console.log("activating " + type + ": " + id)
		searchText = ''
		await new Promise(r => setTimeout(r, 50));
		makeActive(id, type)
	}

	// Unsubscribe from realtime messages
	onDestroy(() => {
		unsubscribeMessages?.();
		unsubscribeChats?.();
		unsubscribeGroups?.();
		unsubscribeUsers?.();
	});

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let searchText = ''

	// eslint-disable-next-line no-unused-vars
	function handleSearch() {
		dispatch('search', searchText)
	}

	function filterUsers(query) {
		if (!query || query === '') {
			return []
		}
		return allUsers.filter(entity =>
				entity.name.toLowerCase().includes(query.toLowerCase())
		)
	}

	function retrieveConversationPartner(id) {
		console.log("looking up id: " + id)
		let groupResult = groups.filter(group => group.id===id)[0];
		let chatResult = chats.filter(chat => chat.id===id)[0];

		if (groupResult) {
			console.log("found group with name: " + groupResult.name)
			return groupResult
		} else if (chatResult) {
			console.log("current user is: " + data.user.id + " / " + data.user.name)
			console.log("found username: " + chatResult.users.filter(user => user !== data.user.id))
			let userId = chatResult.users.filter(user => user !== data.user.id)[0]
			let user = allUsers.filter(user => user.id === userId) [0]
			console.log("returning " + user.id)
			return user
		} else {
			console.log("wtf")
		}
	}

	function filterGroups(query) {
		if (!query || query === '') {
			return []
		}
		return allGroups.filter(entity =>
				entity.name.toLowerCase().includes(query.toLowerCase())
		)
	}
</script>

{#if data.user}
	<div class="overflow-y-scroll w-full">
		<input bind:value={searchText} type="text" placeholder="Search" class="input w-full" />
		<br>
		<hr>
		<br>
	</div>
	<div class="w-full" style="position: relative; z-index: 0">
		<div style="position: fixed; z-index: 1">
			<ul class="menu bg-base-100 rounded-box bg-base-200">
				{#each filterGroups(searchText) as group (group.id)}
					<li><button on:click="{addChatReferenceIfNotExiting(group.id, 'group')}" class="font-normal rounded-box hover:shadow-md {active === group.id ? 'active' : ''}" id="{group.id}"><div style="width: 35px; height: 35px; border-radius: 50%; overflow: hidden;"><img src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" alt="User avatar" style="width: 100%; height: auto;"></div>{group.name}</button></li>
				{/each}
				{#each filterUsers(searchText) as user (user.id)}
					<li>
						<button on:click="{addChatReferenceIfNotExiting(user.id, 'chat')}" class="font-normal rounded-box hover:shadow-md " id="{user.id}">
							<div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
								<img src={user.avatar
											 ? getImageURL(user.collectionId, user.id, user.avatar)
											 : `https://ui-avatars.com/api/?name=${user.name}`}
									 alt="User avatar"
									 style="width: 100%; height: auto;">
							</div>{user.name} <span style="color: #808080;"><em>{user.status ? ' - "'  + user.status + '"': ""}</em></span></button>
					</li>
				{/each}
				{#if searchText}
					<li>
						<button disabled="disabled"  class="font-normal rounded-box ">Found {filterUsers(searchText).length} Users and {filterGroups(searchText).length} Groups.</button>
					</li>
				{/if}
			</ul>
		</div>
		<div class="flex flex-row gap-4 h-full" style="position: relative; z-index: 0">
			<div class="basis-1/5 overflow-y-scroll">
				<ul class="menu bg-base-100 w-56 rounded-box">
					<li class="menu-title">
						<span>Groups</span>
					</li>
					{#each groups as group (group.id)}
						<li>
							<button on:click="{makeActive(group.id, 'group')}" style="float:none;width: 300px"  class="font-normal rounded-box hover:shadow-md {active === group.id ? 'active' : ''}" id="{group.id}">
								<div style="width: 35px; height: 35px; border-radius: 50%; overflow: hidden;">
									<MdGroup />
								</div>
								{group.name}
							</button>
						</li>
					{/each}
					<li class="menu-title">
						<span>Chats</span>
					</li>
					{#each chats.filter(c => !c.hiddenFrom.includes(data.user.id)) as chat (chat.id)}
						<li>
							<button on:click="{makeActive(chat.id, 'chat')}" class="font-normal rounded-box hover:shadow-md {active === chat.id ? 'active' : ''} " id="{chat.id}">
									{#each chat.expand.users.filter(function (el) {
										return el.id !== data.user.id
									}) as user (user.id)}
										<div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
										<img src={user.avatar
												 ? getImageURL(user.collectionId, user.id, user.avatar)
												 : `https://ui-avatars.com/api/?name=${user.name}`}
											 alt="User avatar of {user.name}"
											 style="width: 100%; height: auto;">
										</div>
										{user.name}
									{/each}
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<div class="bg-base-200 p-8 rounded-box shadow-md flex flex-col flex-grow justify-between overflow-y-scroll">
				<div class="dropdown dropdown-end mr-4">
					{#if active}
						<p class="normal-case text-2xl" style="float: left; margin-right: 30px">{retrieveConversationPartner(active).name}</p>
						<button on:click={deleteChatReference(active, active_type)} style="float:right"  class="font-normal rounded-box" >
							<div style="width: 35px; height: 35px; border-radius: 50%; overflow: hidden;">
								<FaTrash />
							</div>
						</button>
					{:else}
						<p class="normal-case text-2xl">Select a Chat or create a new one.</p>
					{/if}
				</div>
				{#each messages as message (message.id)}
					<ChatBubble
							type="{message?.expand?.user?.id === data.user.id ? 'end' : 'start'}"
							writer="{message?.expand?.user?.name}"
							sent="{new Date(message.created).toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit'})}"
							message="{message.content}"
							avatar="{message?.expand?.user?.avatar}"
							collectionId="{message?.expand?.user?.collectionId}"
							userId="{message?.expand?.user?.id}"
							status="delivered"
					/>
				{/each}
				{#if active}
					<form
							action="?/sendMessage"
							method="POST"
							class="flex flex-col space-y-2 w-full"
							enctype="multipart/form-data"
							use:enhance={submitMessage}
							use:clearFormFields
					>
						<input type="hidden" id="groupID" disabled={loading} name="groupID" value="{active_type === 'group' ? active : ''}" />
						<input type="hidden" id="chatID" disabled={loading} name="chatID" value="{active_type === 'chat' ? active : ''}" />
						<input type="hidden" name="user" value="{data.user.id}" />
						<Input
								id="content"
								label=""
								type="textarea"
								placeholder="Type here"
								disabled={loading}
								errors={form?.errors?.status}
								max_w_lg={max_w_lg}
						/>
					</form>
				{/if}
			</div>
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