<script>
	let { rushes } = $props();
</script>

<div
	class="bg-primary border-secondary flex h-full flex-col justify-center rounded-lg border-2 p-4"
>
	<h1 class="text-2xl font-bold">Rush</h1>
	<div class="overflow-y-scroll p-4">
		{#each rushes as rush}
			<div
				class="border-base-300 hover:border-accent mt-2 mb-2 flex flex-col gap-2 rounded-lg border-2 border-b-2 p-4 text-sm transition-all duration-300 hover:scale-101 hover:shadow-xl"
			>
				<p class="text-xs">{rush.project}</p>
				<p class="font-semibold">{rush.comment}</p>
			</div>
		{/each}
	</div>
</div>
