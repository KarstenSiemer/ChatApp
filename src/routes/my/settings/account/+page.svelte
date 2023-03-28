<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, Modal } from '$lib/components';

	export let form;
	export let data;
	let usernameModalOpen;
	let loading;

	$: usernameModalOpen = false;
	$: loading = false;

	const submitUpdateUsername = () => {
		loading = true;
		usernameModalOpen = true;
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
			usernameModalOpen = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Username</h3>
		<div class="divider mb-0.5" />
		<Input id="username" label="Username" value={data?.user?.username} disabled />
		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>
			<h3 slot="heading">Change Your Username</h3>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					type="text"
					label="Enter your new username"
					required={true}
					value={form?.data?.username}
					errors={form?.errors?.username}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full" disabled={loading}
					>Change my username</button
				>
			</form>
		</Modal>
	</div>
</div>
