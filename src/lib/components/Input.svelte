<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let hidden = false;
	export let errors;
	export let max_w_lg = true;
</script>

<div class="form-control w-full { max_w_lg ? 'max-w-lg' : '' } mb-2">
	{#if label}
		<label for={id} class="label font-medium pb-1">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		class={type === "file"
			? "file-input file-input-bordered w-full"
			: "input input-bordered w-full"}
		{type}
		{placeholder}
		{required}
		{disabled}
		{hidden}
		{id}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
