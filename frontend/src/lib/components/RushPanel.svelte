<script>
	let { rushes } = $props();
</script>

<div
	class="bg-primary border-secondary flex h-full w-full flex-col rounded-lg border-2 p-3 md:p-4"
>
	<h1 class="text-xl md:text-2xl font-bold mb-2">Rush</h1>
	<div class="flex-grow overflow-y-auto p-2 md:p-4">
		{#each rushes as rush}
			<div
				class="border-base-300 hover:border-accent mb-2 flex flex-col gap-2 rounded-lg border-2 p-3 text-sm transition-all duration-300 hover:scale-101 hover:shadow-xl"
			>
				<p class="text-xs">{rush.project}</p>
				<p class="font-semibold">{rush.comment}</p>
			</div>
		{/each}
	</div>
</div>
