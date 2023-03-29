<script>
	//import { ChatBubble } from '$lib/components';
	export let data;
</script>

<div class="container mx-auto px-4">
	<div class="chat chat-start">
		<div class="chat-image avatar">
			<div class="w-10 rounded-full">
				<img src="https://ui-avatars.com/api/?name=Obi-Wan Kenobi" alt="Profile"/>
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
				<img src="https://ui-avatars.com/api/?name=Anakin Skywalker" alt="Profile"/>
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
