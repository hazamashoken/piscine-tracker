<script>
	let { evaluation } = $props();
</script>

<div class="flex flex-col gap-2 text-sm border-b-2 border-base-300 border-2 p-4 mt-2 mb-2 rounded-lg hover:shadow-xl hover:scale-101 hover:border-accent transition-all duration-300">
	<div class="flex flex-row items-center justify-between gap-2">
		<div>
			<h2>
				<a href="" class="link link-hover text-accent font-bold hover:opacity-50"
					>{evaluation.corrector}</a
				>
				evaluated
				<a href="" class="link link-hover text-accent font-bold hover:opacity-50"
					>{evaluation.corrected}</a
				>
			</h2>
		</div>
		<div>
			<div class="badge badge-accent text-xs">{evaluation.final_mark}%</div>
		</div>
	</div>
	<div class="flex flex-row gap-2 justify-end">
		{#if evaluation.flag.toLowerCase() == 'ok' || evaluation.flag.toLowerCase() == 'outstanding_project'}
			<div class="badge badge-accent text-xs">{evaluation.flag.toLowerCase()}</div>
		{:else}
			<div class="badge badge-error text-primary text-xs">{evaluation.flag.toLowerCase()}</div>
		{/if}
	</div>
	<div>
		<p class="text-xs">Comment</p>
		<p class="font-semibold">{evaluation.comment}</p>
	</div>
	<div>
		<p class="text-xs">Feedback</p>
		<p class="font-semibold">{evaluation.feedback}</p>
	</div>
</div>
