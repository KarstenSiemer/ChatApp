<script>
	import '../app.postcss';
	import MdChat from 'svelte-icons/md/MdChat.svelte';
	export let data;
</script>

<div class="h-full w-full min-h-screen bg-base-200">
	<div class="bg-base-100 border-b-2">
		<div class="navbar xl:container mx-auto bg-base-100 px-4">
			<div class="navbar-start">
				<a
					href="/"
					class="h-12 w-12 text-xl text-base-100 hover:cursor-pointer bg-primary rounded-md"
				>
					<MdChat />
				</a>
				<a class="btn btn-ghost normal-case text-xl">ChatApp</a>

			</div>
			<div class="navbar-end space-x-2">
				{#if data?.isLoggedIn}
					<form action="/logout" method="POST">
						<button class="btn btn-primary">Logout</button>
					</form>
				{:else}
					<a href="/login" class="btn btn-outline">Login</a>
					<a href="/register" class="btn btn-primary btn-outline">Register</a>
				{/if}
			</div>
		</div>
	</div>
	<div class="h-full w-full xl:container mx-auto mt-8 px-4">
		<slot />
	</div>
</div>
