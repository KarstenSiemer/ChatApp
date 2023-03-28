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
				<p class="px-8 font-semibold normal-case text-2xl">ChatApp</p>

			</div>
			<div class="navbar-end space-x-2">
				{#if data?.isLoggedIn}
					<p class="px-2 normal-case text-2xl">{data?.user?.name || 'undefined' }</p>
					<div class="dropdown dropdown-end pr-2">
						<label tabindex="0" class="btn btn-ghost btn-circle avatar">
							<div class="w-10 rounded-full">
								<img src="https://picsum.photos/80/80" alt="Profile"/>
							</div>
						</label>
						<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a class="justify-between" href="/">
									Profile
								</a>
							</li>
							<li><a href="/">Settings</a></li>
							<li>
								<form action="/logout" method="POST">
									<button type="submit">Logout</button>
								</form>
							</li>
						</ul>
					</div>
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
