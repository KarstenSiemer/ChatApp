<script>
	//import { ChatBubble } from '$lib/components';
	export let data;
</script>

{#if data.user}
	<div class="flex flex-row flex-nowrap gap-4 max-h-full">
		<div class="basis-1/5">
			<ul class="menu bg-base-100 w-56 rounded-box">
				<li class="menu-title">
					<span>Groups</span>
				</li>
				{#each data.groups as group}
					<li><a class="font-medium" >{group.name}</a></li>
				{/each}
				<li class="menu-title">
					<span>Chats</span>
				</li>
				{#each data.chats as chat}
				<li><a class="font-medium" >{chat.with}</a></li>
				{/each}
			</ul>
		</div>
		<div class="bg-base-200 grow p-8">
			<div class="chat chat-start">
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img src="https://ui-avatars.com/api/?name=A b" />
					</div>
				</div>
				<div class="chat-header">
					Obi-Wan Kenobi
					<time class="text-xs opacity-50">12:45</time>
				</div>
				<div class="chat-bubble">You were the Chosen One!</div>
				<div class="chat-footer opacity-50">
					Delivered
				</div>
			</div>
			<div class="chat chat-end">
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img src="https://ui-avatars.com/api/?name=C D" />
					</div>
				</div>
				<div class="chat-header">
					Anakin
					<time class="text-xs opacity-50">12:46</time>
				</div>
				<div class="chat-bubble">I hate you!</div>
				<div class="chat-footer opacity-50">
					Seen at 12:46
				</div>
			</div>
		</div>
	</div>
{/if}