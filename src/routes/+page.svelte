<script>
	import { ChatBubble } from '$lib/components';
	export let data;
</script>

{#if data.user}
	<div class="flex flex-row gap-4 h-full">
		<div class="basis-1/5 overflow-y-scroll">
			<ul class="menu bg-base-100 w-56 rounded-box">
				<li class="menu-title">
					<span>Groups</span>
				</li>
				{#each data.groups as group}
					<li><a class="font-normal rounded-box hover:shadow-md" id="{group.id}">{group.name}</a></li>
				{/each}
				<li class="menu-title">
					<span>Chats</span>
				</li>
				{#each data.chats as chat}
				<li>
					<a class="font-normal rounded-box hover:shadow-md" id="{chat.id}">
					{chat.expand.users.filter(function (el) {
						return el.id !== data.user.id
					})[0].name}
					</a>
				</li>
				{/each}
			</ul>
		</div>
		<div class="bg-base-200 p-8 rounded-box shadow-md flex flex-col flex-grow justify-between overflow-y-scroll">
			{#each data.messages as message}
				<ChatBubble
					type="{message?.expand?.user?.id === data.user.id ? 'end' : 'start'}"
					writer="{message?.expand?.user?.name}"
					sent="{new Date(message.created).toLocaleTimeString('en-US', {hour12:false, hour:'2-digit', minute:'2-digit'})}";
					message="{message.content}"
					status="delivered"
				/>
			{/each}
			<input type="text" placeholder="Type here" class="input input-bordered input-primary w-full" />
		</div>
	</div>
{/if}